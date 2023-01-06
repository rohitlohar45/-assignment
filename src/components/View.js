import React from 'react'
import {Icon} from 'react-icons-kit'
import {trash} from 'react-icons-kit/feather/trash'
import {logOut} from 'react-icons-kit/feather/logOut'

export const View = ({students,deleteStudent,checkOut}) => {
    
    return students.map(student=>(
        
        <tr key={student.rollno}>
            <td>{student.name}</td>
            <td>{student.rollno}</td>
            <td>{student.checkin}</td>
            {student.checkout!==0 &&
            <td>{student.checkout}
            </td>}
            {student.checkout===0 &&<td className='delete-btn' onClick={()=>checkOut(student.rollno)}>
                <Icon icon={logOut}/>
            </td>}
            <td className='delete-btn' onClick={()=>deleteStudent(student.rollno)}>
                <Icon icon={trash}/>
            </td>           
        </tr>            
    
))
}
