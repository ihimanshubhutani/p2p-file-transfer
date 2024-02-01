const express = require("express");
const { ExpressPeerServer } = require("peer");
const cors = require("cors");

const fileRoutes = require("./routes/fileRoutes");
const frontendRoutes = require("./routes/frontendRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.set("view engine", "ejs");
app.use(express.static("public"));

// Use file routes for API endpoints
app.use("/api/files", fileRoutes);

// Use frontend routes for rendering views for frontend
app.use("/", frontendRoutes);

// Serve the public folder
app.use(express.static("public"));

// PeerJS setup
const server = require("http").Server(app);
const peerServer = ExpressPeerServer(server, {
  debug: true,
});

app.use("/peerjs", peerServer);

const activeConnections = {};

peerServer.on("connection", (client) => {
  const clientId = client.getId();

  // Handle disconnection
  client.on("close", () => {
    // Clean up active connections on disconnection
    const fileId = Object.keys(activeConnections).find(
      (id) => activeConnections[id].peerId === clientId
    );
    if (fileId) {
      delete activeConnections[fileId];
    }
  });
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
