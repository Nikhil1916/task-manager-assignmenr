import {Request, Response} from "express";
import {Task} from "../models/task.model";
import { createTaskSchema, updateTaskSchema } from "../validators/task.schema";

export async function createTask(req:Request, res:Response) {
    const parsed = createTaskSchema.safeParse(req.body);
    if(!parsed.success) {
        return res.status(400).json({ message: parsed.error.issues[0].message,

             property: parsed?.error?.issues?.[0]?.path?.[0]
         });
    }
    const task = await Task.create({
        ...parsed.data,
        user: req.userId
    });
    return res.status(201).json(task);
}

export async function getMyTasks(req:Request, res:Response) {
    const tasks = await Task.find({user:req.userId,
        $or:[
            {is_deleted: false},
            {is_deleted:{
                $exists: false
            }}
        ]
    }).sort({createdAt:-1});
    return res.json({
        tasks: tasks
    })
}

export async function updateTask(req:Request, res:Response) {
    const parsed = updateTaskSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: parsed.error.issues[0].message,
         property: parsed?.error?.issues?.[0]?.path?.[0]
     });
    const {id} = req.params;
    const task = await Task.findOneAndUpdate(
        {
            _id: id,
            user: req.userId
        },
        {
            $set: parsed.data
        },
        {
            new: true
        }
    );

    if(!task) return res.status(404).json({
        message:"Task not found"
    });

    return res.json(task);
}

export async function deleteTask(req: Request, res: Response) {
  const { id } = req.params;
  const deleted = await Task.findOneAndUpdate({ _id: id, user: req.userId },
    {
        $set:{
            is_deleted: true
        }
    }
  );
  if (!deleted) return res.status(404).json({ message: 'Task not found' });
  res.json({ message: 'Deleted' });
}


