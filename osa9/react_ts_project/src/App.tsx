const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  interface header {
    name: string
  }

  interface courseContent {
    name: string;
    exerciseCount: number
  }

  interface content {
    courses: Array<courseContent>
  }

  const Header = (props: header) => {
    return <h1>Hello, {props.name}</h1>;
  }

  const Content = (props: content) => {
    return (
      <div>
        {props.courses.map((course) => (
          <p key={course.name}>{course.name} {course.exerciseCount}</p>
        ))}
      </div>
    )
  }

  const Total = (props: content) => {
    return (
      <p>
      Number of exercises{" "}
      {props.courses.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    )
  }

  return (
    <div>
      <Header name={courseName} />
      <Content courses={courseParts} />
      <Total courses={courseParts} />
    </div>
  );
};

export default App;
