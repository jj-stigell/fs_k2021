const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the easy course part",
      type: "normal"
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the hard course part",
      type: "normal"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      type: "groupProject"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
      type: "submission"
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      type: "special"
    }
  ]

  interface header {
    name: string
  }

  interface content {
    courses: Array<CoursePartBase>
  }

  interface CoursePartBase {
    name: string;
    exerciseCount: number;
    type: string;
  }

  interface CoursePartDescription extends CoursePartBase {
    description: string;
  }

  interface CourseNormalPart extends CoursePartDescription {
    type: "normal";
  }
  interface CourseProjectPart extends CoursePartBase {
    type: "groupProject";
    groupProjectCount: number;
  }

  interface CourseSubmissionPart extends CoursePartDescription {
    type: "submission";
    exerciseSubmissionLink: string;
  }

  interface CourseSpecialPart extends CoursePartDescription {
    requirements: Array<string>;
  }

  type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;

  const Header = (props: header) => {
    return <h1>{props.name}</h1>;
  }

  const Content = (props: content) => {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const renderData = (course: any) => {
      switch (course.type) {
        case "normal":
          return (
            <p key={course.name}>
              <strong>{course.name} {course.exerciseCount}</strong><br/>
              {course.description}
            </p>
          );
        case "groupProject":
          return (
            <p key={course.name}>
              <strong>{course.name} {course.exerciseCount}</strong><br/>
              project exercises {course.groupProjectCount}
            </p>
          );
        case "submission":
          return (
            <p key={course.name}>
              <strong>{course.name} {course.exerciseCount}</strong><br/>
              {course.description}<br/>
              submit to {course.exerciseSubmissionLink}
            </p>
          );
        case "special":
          return (
            <p key={course.name}>
              <strong>{course.name} {course.exerciseCount}</strong><br/>
              {course.description}<br/>
              required skills: {course.requirements.join(", ")}
            </p>
          );
        default:
          return("")
      }
    };
  
    return (
      <div>
        {props.courses.map((course) => (
          renderData(course)
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
