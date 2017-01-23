package main

import(
  "fmt"
  "net/http"
  "os/exec"
  "strings"

  "gopkg.in/gin-gonic/gin.v1"
)

func main() {
  const port = "4000"

  gin.SetMode(gin.ReleaseMode)
  r := gin.New()
  r.Use(gin.Recovery())

  // Add HTML files
  r.LoadHTMLGlob("index.html")

  // Serve static files
  r.Static("/dist", "./dist")

  r.GET("/", func(c *gin.Context) {
    c.HTML(http.StatusOK, "index.html", nil)
  })

  // Handle each command endpoint for the client's requests
  r.GET("/command/:name", func(c *gin.Context) {
    name := c.Param("name")

    // Execute the script based on the command's name
    out, err := exec.Command("scripts/" + name + ".sh").Output()

    if err != nil {
      fmt.Println(err)
    }

    // Split the output into "id, title, content"
    info := strings.Split(string(out), ", ")

    // Send a JSON reponse back to the client with the parsed info
    c.JSON(200, gin.H{
      "id": info[0],
      "title": info[1],
      "content": strings.TrimSpace(info[2]),
    })
  })

  // Listen on port 4000
  fmt.Println("Listening on port " + port)
  r.Run(":" + port)
}