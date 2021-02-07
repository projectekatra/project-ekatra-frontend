import React, {
    useRef,
    useEffect
} from 'react'
import { baseUrl } from "../../shared/baseUrl"

const Canvas = props => {

        const canvasRef = useRef(null)
        var records = [];
        useEffect(() => {

        fetch(baseUrl+"api/authors")
      .then((response) => response.json())
      .then((data) => {
        init(data);
        records = data
      })
     .catch((error) => 
alert("An Error Occurred"));
                  const canvas = canvasRef.current
                    const ctx = canvas.getContext('2d')
                    let animationFrameId;
                    var points = [];
                    var radius = 30;
                    var mouse = {
                        x: undefined,
                        y: undefined
                    }

                    var colors = [
                        ["#004E64", "rgba(184, 197, 214, 0.58)"],
                        ["#F2C57C", "rgba(219, 254, 135, 0.58)"],
                        ["#153B50", "rgba(30, 33, 43, 0.58)"],
                        ["#CEA07E", "rgba(132, 108, 91, 0.58)"],
                        ["#9EA93F", "rgba(96, 113, 47, 0.58)"],
                        ["#087F8C", "rgba(9, 82, 86, 0.58)"],
                        ["#FF7733", "rgba(230, 59, 46, 0.58)"],
                        ["#297373", "rgba(255, 133, 82, 0.58)"]
                    ]

                    canvas.addEventListener("mousemove", (e) => {
                        if (e.x > canvas.width / 2 - 80 && e.x < canvas.width / 2 + 80 && e.y < canvas.height / 2 + 75 && e.y > canvas.height / 2 +51) {
                            document.querySelector("canvas").style.cursor = "pointer";
                        } else {
                            document.querySelector("canvas").style.cursor = "auto";
                        }
                        mouse.x = e.x;
                        mouse.y = e.y;
                    })
                    
                    if(records.length!==0)
                    var details;
    

                    canvas.addEventListener("click", (e) => {
                        if (e.x > canvas.width / 2 - 80 && e.x < canvas.width / 2 + 80 && e.y < canvas.height / 2 + 75 && e.y > canvas.height / 2 +51) {
                            window.open("mailto:" + details.email, "_blank")
                        }

                        function dist_(x1, y1, x2, y2) {
                            return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2))
                        }
                        var index = -1;
                        var max_dis = Number.MAX_SAFE_INTEGER;
                        for (var i = 0; i < points.length - 1; i++) {
                            if (points[i].dtheta === 0) {
                                if (dist_(e.clientX, e.clientY-70, points[i].x, points[i].y) < max_dis) {
                                    index = i;
                                    max_dis = dist_(e.clientX, e.clientY-70, points[i].x, points[i].y)
                                }
                            }
                        }
                        if (index !== -1) {
                            points[points.length-1].radius = 0;
                            points[points.length-1].color = colors[Math.floor(Math.random() * (colors.length))];
                            details.name = points[index].Name;
                            details.email = points[index].email;
                            details.contributions = records[index].contributions;
                            details.colorname = colors[Math.floor(Math.random() * (colors.length))][0];
                            details.coloremail = colors[Math.floor(Math.random() * (colors.length))][0];
                            details.colorcontribution = colors[Math.floor(Math.random() * (colors.length))][0];
                        }
                    })

                        canvas.width = window.innerWidth;
                        canvas.height = window.innerHeight-70;
                        function init(records) {
                            if(records.length!==0)
                             details = {
                        ...records[0],
                        colorname: colors[0][0],
                        coloremail: colors[1][0],
                        colorcontribution: colors[2][0]
                    }
                            points = []
                            for (var i = 0; i < records.length; i++) {
                                var x = Math.random() * 80 + 180;
                                var y = 2 * Math.random() * Math.PI;
                                var radius_temp = Math.random() * (radius - 10) + 3;
                                var color = colors[Math.floor(Math.random() * (colors.length))];
                                points.push(new point(x, y, radius_temp, 0.008 * Math.random() + 0.004, (Math.random() - 0.5), color, records[i].name, records[i].email))
                            }
                              if(records.length!==0)
                            points.push(new point_new(canvas.width / 2, canvas.height / 2, color))
                        }


                        function point_new(x, y, color) {
                            this.x = x;
                            this.y = y;
                            this.radius = 0;
                            this.color = color;

                            this.draw = function() {
                                ctx.beginPath();
                                ctx.arc(this.x, this.y, this.radius, Math.PI * 2, false);
                                ctx.strokeStyle = this.color[1]
                                ctx.lineWidth = 5;
                                ctx.fillStyle = "white"
                                ctx.fill();
                                ctx.stroke();
                                if (this.radius > 120) {
                                    ctx.textAlign = "center";
                                    ctx.font = "23px 'Dancing Script'";
                                    ctx.fillStyle = details.colorname;
                                    ctx.fillText(details.name, this.x, this.y - 12);
                                    ctx.font = "18px 'Open Sans Condensed'";
                                    ctx.fillStyle = details.coloremail;
                                    ctx.fillText(details.email, this.x, this.y + 12);
                                    ctx.font = "18px 'Open Sans Condensed'";
                                    ctx.fillStyle = details.colorcontribution;
                                    ctx.fillText("Contributions: " + details.contributions, this.x, this.y + 36);
                                }
                            }


                            this.update = function() {
                                if(this.radius<130)
                                {
                                this.radius+=(130-this.radius)/30;
                                }
                                else
                                {this.radius = 130}
                                this.draw();
                            }
                        }



                        function point(r, theta, radius_temp, dtheta, dr, color, name, email) {
                            this.r = 0;
                            this.permanentr = r;
                            this.theta = theta;
                            this.x = canvas.width / 2 + r * Math.cos(theta);
                            this.y = canvas.height / 2 + r * Math.sin(theta);
                            this.dtheta = dtheta;
                            this.fixedradius = radius_temp;
                            this.permanent = dtheta;
                            this.radius = radius_temp;
                            this.color = color;
                            this.Name = name;
                            this.email = email;

                            this.draw = function() {
                                ctx.beginPath();
                                ctx.arc(this.x, this.y, this.radius, Math.PI * 2, false);
                                ctx.strokeStyle = this.color[1]
                                ctx.lineWidth = 5;
                                ctx.fillStyle = "white"
                                ctx.fill();
                                ctx.stroke();
                                if (this.radius > radius - 8) {
                                    ctx.font = "30px 'Hanalei Fill'";
                                    ctx.fillStyle = this.color[0];
                                    ctx.textAlign = "center";
                                    ctx.fillText(this.Name[0].toUpperCase(), this.x, this.y + 12);
                                }
                            }


                            this.update = function() {
                                if (Math.sqrt((mouse.x - this.x) * (mouse.x - this.x) + (mouse.y - this.y-70) * (mouse.y - this.y-70)) < 50) {
                                    this.dtheta = 0;
                                    if (this.radius < radius) {
                                        this.radius += (radius - this.radius) / 10
                                    }
                                } else {
                                    this.dtheta = this.permanent;
                                    if (this.radius > this.fixedradius) {
                                        this.radius -= (this.radius - this.fixedradius) / 10
                                    }
                                }
                                if(this.r<this.permanentr)
                                {
                                this.r+=(this.permanentr-this.r)/45;
                                }
                                else
                                {this.r = this.permanentr}

                                this.theta += this.dtheta
                                this.x = canvas.width / 2 + this.r * Math.cos(this.theta);
                                this.y = canvas.height / 2 + this.r * Math.sin(this.theta);
                                this.draw();
                            }
                        }

                        const render = () => {
                            animationFrameId = window.requestAnimationFrame(render)
                            ctx.clearRect(0, 0, canvas.width, canvas.height)
                            for (var i = 0; i < points.length; i++)
                                points[i].update();
                        }
                        init(records);
                        render()
                        window.addEventListener("resize", () => {
                     canvas.width = window.innerWidth;
                        canvas.height = window.innerHeight-70;
                        init(records);
                    })

                        return () => {
                            window.cancelAnimationFrame(animationFrameId)
                        }
                    }, [])
                

                    return <canvas ref = {
                        canvasRef
                    } {
                        ...props
                    }
                    />
                }

                export default Canvas
