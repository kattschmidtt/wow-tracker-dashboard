package routes

import (
	"server/controllers"

	"github.com/gin-gonic/gin"
)

func GetAccountInfo() *gin.Engine {
	r := gin.Default()

	r.GET("/account-info", controllers.GetAccountInfo)

	return r
}
