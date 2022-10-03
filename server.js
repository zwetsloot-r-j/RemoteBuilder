const express = require("express");
const vscode = require("vscode");

const startServer = (port) => {
  const app = express();

  return vscode.tasks.fetchTasks().then(function(tasks) {
    for (let task of tasks) {
      app.get(`/${task._name}`.replaceAll(" ", "_"), (req, res) => {
        vscode.tasks.executeTask(task);
        res.send(`Executing task: ${task._name}`);
      });
    }

    app.get("/ping", (req, res) => {
      res.send("pong");
    });

    app.get("/", (req, res) => {
      var routes = app._router.stack
        .map(x => x.route)
        .filter(x => x != null)
        .map(x => x.path)
        .join("\n")
        ;

      res.send(routes);
    });

    vscode.window.showInformationMessage(`Remote Builder attempting to listen on port ${port}`);
    app.listen(port, (err) => {
      if (err != null) {
        vscode.window.showErrorMessage(`Remote Builder server error: ${err}`);
      } else {
        vscode.window.showInformationMessage(`Remote Builder listening on port ${port}`);
      }
    });
  });
}

module.exports = {
  startServer: startServer,
}