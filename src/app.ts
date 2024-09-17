import { error } from "console";
import express, { NextFunction, Request, Response, response } from "express";
const app = express();

// parsers
app.use(express.json());
app.use(express.text());

//router
const userRouter = express.Router();
const courseRouter = express.Router();

app.use("/api/v1/users", userRouter);
app.use("/api/v1/courses", courseRouter);

userRouter.post("/create-user", async (req: Request, res: Response) => {
  const user = req.body;

  res.json({
    success: true,
    message: "User successfully created",
    data: user,
  });
});

courseRouter.post("/create-course", async (req: Request, res: Response) => {
  const course = req.body;

  res.json({
    success: true,
    message: "Successfully created course !!",
    data: course,
  });
});

// middleware
const logger = async (req: Request, res: Response, next: NextFunction) => {
  console.log("===>", req.hostname, req.url);
  next();
};

// home
app.get(
  "/",
  logger,
  async (req: Request, res: Response, next: NextFunction) => {
    // console.log(req.params.userId);
    try {
      res.send("something");
    } catch (error) {
      // console.log(error);
      next(error);
    }
  }
);

// post route
app.post("/", logger, async (req: Request, res: Response) => {
  const data = req.body;
  console.log(data?.person1.name + " + " + data?.person2.name);
  const d = data?.person1.name + " + " + data?.person2.name;
  res.json({
    success: true,
    sendData: d,
  });
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.log(error);
  if (error) {
    res.status(404).json({
      success: false,
      message: "Failled to get Data",
    });
  }
});

export default app;
