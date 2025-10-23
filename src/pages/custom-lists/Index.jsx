import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import AppLayout from '../../components/AppLayout';

const CustomLists = () => {
  const navigate = useNavigate();
  const [lists, setLists] = useState([]);
  const [newListName, setNewListName] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState('');

  // Load lists from localStorage on component mount
  useEffect(() => {
    const savedLists = localStorage.getItem('userCustomLists');
    if (savedLists) {
      setLists(JSON.parse(savedLists));
    } else {
      // Default lists if none exist
      const defaultLists = [
        { id: '1', name: 'Personal Tasks', taskCount: 5, createdAt: new Date().toISOString() },
        { id: '2', name: 'Work Projects', taskCount: 3, createdAt: new Date().toISOString() }
      ];
      setLists(defaultLists);
      localStorage.setItem('userCustomLists', JSON.stringify(defaultLists));
    }
  }, []);

  // Save lists to localStorage whenever they change
  useEffect(() => {
    if (lists.length > 0) {
      localStorage.setItem('userCustomLists', JSON.stringify(lists));
    }
  }, [lists]);

  const handleCreateList = () => {
    if (!newListName.trim()) {
      setError('Please enter a list name');
      return;
    }

    const newList = {
      id: Date.now().toString(),
      name: newListName.trim(),
      taskCount: 0,
      createdAt: new Date().toISOString()
    };

    setLists([...lists, newList]);
    setNewListName('');
    setIsCreating(false);
    setError('');
  };

  const handleDeleteList = (id) => {
    setLists(lists.filter(list => list.id !== id));
  };

  const handleViewList = (id) => {
    navigate(`/task-list-detail?list=${id}`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <AppLayout>
      <div className="w-full px-2 sm:px-4 py-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-foreground">My Custom Lists</h1>
          {!isCreating && (
            <Button 
              variant="default" 
              iconName="Plus"
              onClick={() => setIsCreating(true)}
            >
              Create New List
            </Button>
          )}
        </div>

        {isCreating && (
          <div className="bg-card border border-border rounded-lg p-4 mb-6">
            <h2 className="text-lg font-semibold mb-4">Create New List</h2>
            <div className="flex gap-3">
              <Input
                placeholder="Enter list name"
                value={newListName}
                onChange={(e) => {
                  setNewListName(e.target.value);
                  if (error) setError('');
                }}
                error={error}
                className="flex-1"
              />
              <Button variant="default" onClick={handleCreateList}>
                Create
              </Button>
              <Button variant="ghost" onClick={() => {
                setIsCreating(false);
                setNewListName('');
                setError('');
              }}>
                Cancel
              </Button>
            </div>
          </div>
        )}

        {lists.length === 0 ? (
          <div className="text-center py-12">
            <Icon name="List" size={48} className="mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">No Lists Yet</h2>
            <p className="text-muted-foreground mb-6">Create your first custom list to organize your tasks</p>
            <Button 
              variant="default" 
              iconName="Plus"
              onClick={() => setIsCreating(true)}
            >
              Create New List
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lists.map(list => (
              <div 
                key={list.id} 
                className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-foreground">{list.name}</h3>
                  <div className="flex space-x-1">
                    <button 
                      className="text-muted-foreground hover:text-foreground"
                      onClick={() => handleDeleteList(list.id)}
                    >
                      <Icon name="Trash2" size={16} />
                    </button>
                  </div>
                </div>
                <div className="flex items-center text-sm text-muted-foreground mb-6">
                  <Icon name="Calendar" size={14} className="mr-1" />
                  <span>Created on {formatDate(list.createdAt)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm">
                    <Icon name="CheckSquare" size={14} className="mr-1 text-primary" />
                    <span>{list.taskCount} tasks</span>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleViewList(list.id)}
                  >
                    View List
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default CustomLists;