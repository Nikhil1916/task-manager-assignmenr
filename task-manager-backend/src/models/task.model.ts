import mongoose, {Schema, Document, Types} from "mongoose";
export type TaskStatus = 'pending' | 'completed';
export interface ITask extends Document {
    title: string,
    description: string,
    status: TaskStatus,
    user: Types.ObjectId,
    createdAt: Date,
    updatedAt: Date,
    is_deleted: Boolean
}

const taskSchema = new Schema<ITask>(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            default: ''
        },
        status: {
            type: String,
            enum: ['pending', 'completed'],
            default: 'pending'
        },
        user: {
            type: Schema.Types.ObjectId,
            ref:"User",
            required: true,
        },
        is_deleted: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

export const Task = mongoose.model<ITask>('Task', taskSchema);