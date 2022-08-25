### Linting

For linting, python has many options to choose from. For this project a [Pylint](https://pypi.org/project/pylint/) is chosen.
Since python is a dynamic interpreted language, this linting tool allows error checking, enforces coding standards for more 
readable code and give suggestions on refactoring. It can be installed from the command line using pip: `pip install pylint`. 
For more detailed instructions check the [documentation](https://pylint.pycqa.org/en/latest/)

### Testing

For testing [pytest](https://docs.pytest.org/en/7.1.x/) is used. It is a fully featured testing tool for python projects.
Pytest can be installed with command: `pip install -U pytest` For more detailed instructions check the 
[documentation](https://docs.pytest.org/en/7.1.x/contents.html).

### Building

For building [Jenkins](https://www.jenkins.io/solutions/python/) supports also Python Since Python is interpreted language 
there is no need for building the software before running. Nevertheless having a tool for continuous integration is good to have. 

### Alternatives for Jenkins and GitHub Actions

One good alternative for setting up the CI is [GitLab CI/CD](https://docs.gitlab.com/ee/ci/). GitLab is a version control 
service much like GitHub.

### Self-hosted or a cloud-based environment

Since this setup uses Jenkins, it is better to use the self-hosted environment despite it having some upfront costs compared 
to the cloud-based environment.
