const SubHeader = ({ course }) => <h2>{course}</h2>

const Total = ({ parts }) => {
    const sum = parts.reduce((sum, part) => sum + part['exercises'], 0)

    return <p> <strong>Total of {sum} exercises</strong>  </p>
}

const Part = ({ part }) =>
    <p>
        {part.name} {part.exercises}
    </p>




const NodeCourses = ({ parts }) =>
        
  <>
     
      <Part
          part={parts[0]}
      />
      <Part
          part={parts[1]}
      />
      
      

  </>    

const ReactCourses = ({ parts }) =>
        
    <>
       
        <Part
            part={parts[0]}
        />
        <Part
            part={parts[1]}
        />
        <Part
            part={parts[2]}
        />
        <Part
            part={parts[3]}
        />
        

    </>


const Course = ({ courses }) => {
    return (
        <div>
            <h1>Web Development Curriculum</h1>
            <SubHeader course={courses[0]['name']} />
            <ReactCourses parts={courses[0]['parts']} />
            <Total parts={courses[0]['parts']}/>
            <SubHeader course={courses[1]['name']} />
            <NodeCourses parts={courses[1]['parts']} />
            <Total parts={courses[1]['parts']}/>
            
        </div>
    )
}



export default Course