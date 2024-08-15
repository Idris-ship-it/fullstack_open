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



const CourseInfo = () => {
    
    const courses = [
        {
          name: 'Half Stack application development',
          id: 1,
          parts: [
            {
              name: 'Fundamentals of React',
              exercises: 10,
              id: 1
            },
            {
              name: 'Using props to pass data',
              exercises: 7,
              id: 2
            },
            {
              name: 'State of a component',
              exercises: 14,
              id: 3
            },
            {
              name: 'Redux',
              exercises: 11,
              id: 4
            }
          ]
        }, 
        {
          name: 'Node.js',
          id: 2,
          parts: [
            {
              name: 'Routing',
              exercises: 3,
              id: 1
            },
            {
              name: 'Middlewares',
              exercises: 7,
              id: 2
            }
          ]
        }
      ]

      
    return <Course courses={courses} />


}

export default CourseInfo
