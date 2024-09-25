import React from 'react';
import { SubtaskListProps } from '../redux/Features/types';

export const SubtaskList: React.FC<SubtaskListProps> = ({ subtasks }) => {
    return (
        <div className="ml-5 mt-2 pl-3 dark:text-gray-200">
            {subtasks.map((subtask) => (
                <div key={subtask._id} className="flex flex-col gap-1 mb-2">
                    <div className="">
                        <div className="flex justify-between">
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    className="rounded-md dark:bg-gray-800 border-gray-500"
                                />
                                <p>{subtask.description}</p>
                            </div>
                            <div>
                                <i className="fas fa-edit pr-3"></i>
                                <i className="fas fa-angle-down"></i>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <p className="">
                                <i className="fas fa-list ">1/2</i>
                                <i className="fas fa-calendar ml-2"></i>
                                {new Date(subtask.date).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                    {subtask.subtasks && subtask.subtasks.length > 0 && (
                        <SubtaskList subtasks={subtask.subtasks} />
                    )}
                </div>
            ))}
        </div>
    );
};