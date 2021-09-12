module.exports = function ProjectService(projectModel) {
  this.getAllProjects = async function() {
    return projectModel.getAllProjects();
  }
}