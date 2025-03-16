import jwt from 'jsonwebtoken'
const genearateToken =(id,res)=>{
    const token=jwt.sign({id},process.env.JWT_SEC,{
     expiresIn:"360d"
    });
    res.cookie("token",token,{
        maxAge:360 * 24 * 60 * 60 * 1000,
        httpOnly:true,
        sameSite:"strict",
    });
};
export default genearateToken;