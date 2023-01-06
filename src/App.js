import React,{useState, useEffect} from 'react'
import { View } from './components/View';

// getting the values of local storage
const getDatafromLS=()=>{
  const data = localStorage.getItem('students');
  if(data){
    return JSON.parse(data);
  }
  else{
    return []
  }
}

export const App = () => {

  // main array of objects state || students state || students array of objects
  const [students, setstudents]=useState(getDatafromLS());
  const [nstudents, setnstudents]=useState('');

  useEffect(()=>{
		setnstudents(students);
	}, [])

  // input field states
  const [name, setName]=useState('');
  const [rollno, setRollno]=useState('');
  const [checkin, setCheckIn]=useState('');
  const [checkout, setCheckOut]=useState('');

  // form submit event
  const handleAddStudentSubmit=(e)=>{
    e.preventDefault();
    // creating an object

    let current = new Date();
    
    let book={
      name,
      rollno,
      checkin: current.toLocaleTimeString(),
      checkout: 0,
    }
    setstudents([...students,book]);
    setnstudents([...students,book]);
    setName('');
    setRollno('');
    setCheckIn('');
    setCheckOut('');
  }

  // delete book from LS
  const deleteStudent=(rollno)=>{
    // console.log(rollno);
    const filteredStudents=Object.values(students).filter((element,index)=>{
      return element.rollno !== rollno
    })
    setstudents(filteredStudents);
    setnstudents(filteredStudents);
  }

  function search(value) {
    console.log("value: ",value);
    if(value==='ALL'){
      console.log(students);
      return students;
    }

    const items = []
    students.filter((item) => {
      // console.log(filterParam);
      if (value=='0' &&item.checkout == value) {
        console.log("Sucess");
          items.push(item) 
      }else if(value=='1'&&item.checkout != 0){
        items.push(item);
      }
        // console.log(items);
        
    });
    return items;
  }     

  const checkOut=(id)=>{
    
    let current = new Date();
    const myData = students.map(x => {
        if (x.rollno === id) {
          console.log("Success",id);
          x.checkout = current.toLocaleTimeString()
          console.log(x);
          return x;
        }
        setCheckOut('');
        setstudents(students);
        setnstudents(students);
        return x;
    })
  }

  
  

  // saving data to local storage
  useEffect(()=>{
    localStorage.setItem('students',JSON.stringify(students));
  },[students])

  return (
    <div className='wrapper'>
      <h1>StudentList App</h1>
      <p>Add and view your students using local storage</p>
      <div className='main'>

        <div className='form-container'>
          <form autoComplete="off" className='form-group'
          onSubmit={handleAddStudentSubmit}>
            <label>Name</label>
            <input type="text" className='form-control' required
            onChange={(e)=>setName(e.target.value)} value={name}></input>
            <br></br>
            <label>Rollno</label>
            <input type="text" className='form-control' required
            onChange={(e)=>setRollno(e.target.value)} value={rollno}></input>
            <br></br>
            <br></br>
            <button type="submit" className='btn btn-success btn-md'>
              ADD
            </button>
          </form>
        </div>
        <div>
        <div className='view-container'>
        <select
          onChange={(e) => {
            if(e.target.value=='-1'){
              setnstudents(students)
            }else{
              let items = search(e.target.value)
              console.log(items);
              setnstudents(items);
            }
          }} className="custom-select" aria-label="Filter">
        <option value="-1">Filter</option>
        <option value="0">Present In School</option>
        <option value="1">Not Present In School</option>
        </select>
        <span className="focus"></span>
        </div>          
          {nstudents.length>0&&<>
            <div className='table-responsive'>
              <table className='table'>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Roll No.</th>
                    <th>Check In Time</th>
                    <th>Check Out</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  <View students={nstudents} deleteStudent={deleteStudent} checkOut={checkOut}/>
                </tbody>
              </table>
            </div>
          </>}
          {students.length < 1 && <div>No students are added yet</div>}
        </div>

      </div>
    </div>
  )
}

export default App
