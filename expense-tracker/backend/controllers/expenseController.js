const prisma=require('../config/prisma.js')
const createExpense=async (req,res)=>{
    try {
        const {title, amount, category, date}=req.body;
        const {userId}=req.user;
        if(!title || amount===undefined){
            return res.status(400).json({
                message:"Title and amount are required"
            })
        }
        const newExpense=await prisma.expense.create({
            data:{
                title,
                amount:parseFloat(amount),
                category:category || 'General',
                date:date?new Date(date):undefined,
                userId,
            },
        })
        res.status(201).json({
            success:true,
            message:'Expense created successFully',
            expense:newExpense
        })
    } catch (error) {
        console.error('creation expense error:', error);
    res.status(500).json({ success: false, message: 'New Expense cannot be created!!' });
    }
    

}
const getExpense=async (req,res)=>{
    try {
        const {userId}=req.user
        const getExpense=await prisma.expense.findMany({
            where:{userId},
            orderBy:{date:'desc'}
        })
        res.status(200).json({
            success:true,
            data:getExpense
        })
    } catch (error) {
        console.error('getExpense error:',error)
        res.status(500).json({success:false,message:'cannot get expense error occurred!!'})
        
    }
}
const deleteExpense=async (req,res)=>{
    try {
        const {id:expenseId}=req.params;
        const {userId}=req.user
        const expense=await prisma.expense.findFirst({
            where:{id:expenseId,userId}
        })
        if(!expense){
            return res.status(404).json({
                success:false,
                message:'Expense not found or unauthorized'
            })
        }
        const deleteExpense=await prisma.expense.delete({
            where:{id:expenseId}
        })
        res.status(200).json({
            success:true,
            message:'successfully deleted the expense of the user'
        })
    } catch (error) {
        console.error('deleteExpense error:',error)
        res.status(500).json({success:false,message:'cannot detete the expense error or unauthorized!!'})
    }
}
const updateExpense=async (req,res)=>{
    try {
        const {id:expenseId}=req.params
        const {userId}=req.user
        const {title,amount,category,date}=req.body
        const expense=await prisma.expense.findFirst({
            where:{id:expenseId,userId}
        })
        if(!expense){
            return res.status(404).json({
                success:false,
                message:'Expense not found or unauthorized'
            })
        }
        const update=await prisma.expense.update({
            where:{id:expenseId},
            data:{
                title:title !== undefined ? title:expense.title,
                amount:amount !==undefined ? parseFloat(amount): expense.amount,
                category: category !== undefined ? category : expense.category,
                date: date !== undefined ? new Date(date) : expense.date,
            }
        })
        res.status(200).json({
            success:true,
            message:'Expense updated successFully',
            expense:update
        })

    } catch (error) {
        console.error('updateExpense error:',error)
        res.status(500).json({success:false,message:'cannot update the expense error or unauthorized!!'})
    }
}
const getExpenses=async (req,res)=>{
    try {
        const {userId}=req.user;
        const {startDate,endDate,category}=req.query
        const whereClause={userId}
        if(category){
            whereClause.category=category
        }
        if(startDate || endDate){
            whereClause.data={}
            if(startDate){
                whereClause.date.gte=new Date(startDate)
            }
            if(endDate){
                whereClause.date.lte=new Date(endDate)
            }
        }
        const find=await prisma.expense.findMany({
            where:whereClause,
            orderBy:{date:'desc'}
        })
        res.status(200).json({
            success:true,
            count:find.length,
            data:find
        })

    } catch (error) {
        console.error('getExponse error:',error)
        res.status(500).json({success:false,message:'Canonot get expenses, an error occured'})
    }
}
const getExpenseSummary=async (req,res)=>{
    try {
        const {userId}=req.user
        const categorySummary=await prisma.expense.groupBy({
            by:['category'],
            where:{userId},
            _sum:{
                amount:true
            },
            _count:{
                id:true
            }
        })
        const totalSpending=await prisma.expense.aggregate({
            where:{userId},
            _sum:{amount:true}
        })
        res.status(200).json({
            success: true,
            data: {
                totalSpent: totalSpending._sum.amount || 0,
                breakdown: categorySummary
            }
        });
    } catch (error) {
        console.error('getExpenseSummary error:', error);
        res.status(500).json({ 
        success: false, 
        message: 'Cannot calculate expense summary, an error occurred!' 
        });
        
    }
}
module.exports = {
  createExpense,
  getExpense,
  deleteExpense,
  updateExpense,
  getExpenses,
  getExpenseSummary
};
