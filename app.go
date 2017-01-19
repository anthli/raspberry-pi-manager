package main

import(
  "fmt"
  "net/http"
  "os/exec"
  "strings"

  "gopkg.in/gin-gonic/gin.v1"
)

func main() {
  // gin.SetMode(gin.ReleaseMode)
  r := gin.Default()
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

    info := strings.Split(string(out), ", ")

    c.JSON(200, gin.H{
      "id": info[0],
      "title": info[1],
      "content": info[2],
    })
  })

  r.Run(":3000")
}