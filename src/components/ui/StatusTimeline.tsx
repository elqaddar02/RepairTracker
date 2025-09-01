import React from 'react';
import { Check, Clock, AlertCircle } from 'lucide-react';

interface TimelineItem {
  status: string;
  description: string;
  timestamp: string;
  completed: boolean;
}

interface StatusTimelineProps {
  currentStatus: 'waiting' | 'in_progress' | 'completed' | 'cancelled';
  timeline?: TimelineItem[];
}

const StatusTimeline: React.FC<StatusTimelineProps> = ({ currentStatus, timeline }) => {
  const defaultTimeline = [
    { status: 'waiting', description: 'Repair received and logged', completed: true },
    { status: 'in_progress', description: 'Repair in progress', completed: currentStatus === 'in_progress' || currentStatus === 'completed' },
    { status: 'completed', description: 'Repair completed', completed: currentStatus === 'completed' },
  ];

  const timelineItems = timeline || defaultTimeline;

  const getIcon = (status: string, completed: boolean) => {
    if (currentStatus === 'cancelled') {
      return <AlertCircle className="h-5 w-5 text-red-500" />;
    }
    if (completed) {
      return <Check className="h-5 w-5 text-green-500" />;
    }
    return <Clock className="h-5 w-5 text-gray-400" />;
  };

  return (
    <div className="space-y-4">
      {timelineItems.map((item, index) => (
        <div key={index} className="flex items-start space-x-4">
          <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center border-2 ${
            item.completed 
              ? 'bg-green-50 border-green-200' 
              : 'bg-gray-50 border-gray-200'
          }`}>
            {getIcon(item.status, item.completed)}
          </div>
          <div className="flex-1 min-w-0">
            <p className={`text-sm font-medium ${
              item.completed ? 'text-gray-900' : 'text-gray-500'
            }`}>
              {item.description}
            </p>
            {item.timestamp && (
              <p className="text-xs text-gray-500 mt-1">
                {new Date(item.timestamp).toLocaleString()}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatusTimeline;