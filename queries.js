const getTeachersQuery= "SELECT * FROM auth WHERE role='teacher'"
const adminEmail="SELECT email FROM auth WHERE role='admin'"
const addTeacherQuery="INSERT INTO auth(email,password,name,role) VALUES($1,$2,$3,$4)"
const authExistsQuery="SELECT * FROM auth WHERE email=$1"
const checkAuthPassword="SELECT password FROM auth WHERE email=$1"
const checkStudentPassword="SELECT password FROM student_bio WHERE email=$1"
const deleteTeacherQuery="DELETE FROM auth WHERE auth_id IN ($1,$2,$3,$4,$5)"
const updateAuthQuery="UPDATE auth SET verificationtoken=$1 WHERE email=$2"
const getTeacher= "SELECT * FROM auth WHERE auth_id IN ($1,$2,$3,$4,$5)"
const getToken="SELECT verificationtoken FROM auth WHERE email=$1"
const emptyTokenQuery="UPDATE auth SET verificationtoken='' WHERE email=$1"
const updatePasswordQuery="UPDATE auth SET password=$1 WHERE email=$2"
const updateVerificationTokenExpirationQuery="UPDATE auth SET verification_token_expiration_time=$1 WHERE email=$2"
const getVerificationTokenExpirationQuery="SELECT verification_token_expiration_time FROM auth WHERE email=$1"
const authenticateQuery= "SELECT * FROM auth WHERE email=$1 and role=$2"

const studentExistsQuery="SELECT * FROM student_bio WHERE email=$1"
const addStudentQuery="INSERT INTO student_bio(name,email,dob,section,password,image,class_name,role,verificationtoken,verification_token_expiration_time) VALUES($1,$2,$3,$4,$5,$6,$7,$8,null,null)"
const addStudentMarksQuery="INSERT INTO student_marks(student_id,maths,science,english,punjabi,social_science) VALUES($1,$2,$3,$4,$5,$6)"
const getAllStudentsQuery="SELECT * FROM student_bio"


module.exports={
    getAllStudentsQuery,
    getTeachersQuery,
    addTeacherQuery,
    deleteTeacherQuery,
    checkAuthPassword,
    checkStudentPassword,
    updateAuthQuery,
    getTeacher,
    adminEmail,
    getToken,
    updatePasswordQuery,
    emptyTokenQuery,
    updateVerificationTokenExpirationQuery,
    getVerificationTokenExpirationQuery,
    authenticateQuery,
    studentExistsQuery,
    addStudentQuery,
    authExistsQuery
}