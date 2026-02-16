
import React from 'react';
import { AppView } from '../types';
import { COLORS } from '../constants';

interface SidebarProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigate }) => {
  const items = [
    { view: AppView.DASHBOARD, icon: 'M4 6h16M4 12h16M4 18h16', label: 'Intelligence' },
    { view: AppView.MIND_MAP, icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', label: 'Visual Map' },
    { view: AppView.OUTLINE, icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', label: 'Drafting' },
  ];

  return (
    <div className="h-full flex flex-col bg-white border-r border-morning py-10 px-4">
      <div className="mb-12 flex justify-center">
        <div className="w-10 h-10 bg-hadfield rounded-lg flex items-center justify-center text-white font-bold text-xl">R</div>
      </div>
      
      <nav className="flex-1 space-y-4">
        {items.map((item) => (
          <button
            key={item.view}
            onClick={() => onNavigate(item.view)}
            className={`w-full p-4 flex flex-col items-center justify-center group transition-colors duration-200 rounded-lg ${
              currentView === item.view ? 'bg-silk' : 'hover:bg-silk/50'
            }`}
          >
            <svg 
              className={`w-6 h-6 mb-1 ${currentView === item.view ? 'text-hadfield' : 'text-cerebral group-hover:text-hadfield'}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
            </svg>
            <span className={`text-[10px] font-semibold uppercase tracking-tighter ${currentView === item.view ? 'text-hadfield' : 'text-cerebral group-hover:text-hadfield'}`}>
              {item.label}
            </span>
          </button>
        ))}
      </nav>

      <div className="mt-auto pt-6 flex flex-col items-center space-y-4">
         <button className="p-2 text-cerebral hover:text-hadfield transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
         </button>
         <div className="w-8 h-8 bg-morning rounded-full" />
      </div>
    </div>
  );
};
