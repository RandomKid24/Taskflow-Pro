import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Image from '../../../components/AppImage';

const CommentThread = ({ taskId }) => {
  const [comments, setComments] = useState([
  {
    id: 1,
    author: {
      name: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1560859389-c4fb2bd88016",
      avatarAlt: "Professional headshot of Asian woman with shoulder-length black hair in white blouse"
    },
    content: "I\'ve reviewed the initial requirements and they look comprehensive. Should we schedule a kickoff meeting to discuss the implementation approach?",
    timestamp: new Date(Date.now() - 3600000),
    isEdited: false,
    reactions: [
    { emoji: "👍", count: 3, users: ["Mike Rodriguez", "Emma Wilson", "David Kim"] },
    { emoji: "💡", count: 1, users: ["Lisa Anderson"] }],

    replies: [
    {
      id: 11,
      author: {
        name: "Mike Rodriguez",
        avatar: "https://images.unsplash.com/photo-1724128195747-dd25cba7860f",
        avatarAlt: "Professional headshot of Hispanic man with short black hair in navy suit"
      },
      content: "Great idea! I\'m available tomorrow afternoon or Thursday morning. What works best for everyone?",
      timestamp: new Date(Date.now() - 3000000),
      isEdited: false
    }]

  },
  {
    id: 2,
    author: {
      name: "Emma Wilson",
      avatar: "https://images.unsplash.com/photo-1684262855358-88f296a2cfc2",
      avatarAlt: "Professional headshot of blonde woman in blue blazer smiling at camera"
    },
    content: "I've added some design mockups to the shared folder. Please take a look and let me know if you have any feedback on the user interface approach.",
    timestamp: new Date(Date.now() - 7200000),
    isEdited: true,
    reactions: [
    { emoji: "🎨", count: 2, users: ["Sarah Chen", "David Kim"] }],

    replies: []
  },
  {
    id: 3,
    author: {
      name: "David Kim",
      avatar: "https://images.unsplash.com/photo-1687256457585-3608dfa736c5",
      avatarAlt: "Professional headshot of Asian man with glasses in dark suit"
    },
    content: "The technical architecture document has been updated with the latest security requirements. All team members should review section 4.2 regarding data encryption protocols.",
    timestamp: new Date(Date.now() - 10800000),
    isEdited: false,
    reactions: [
    { emoji: "🔒", count: 4, users: ["Sarah Chen", "Mike Rodriguez", "Emma Wilson", "Lisa Anderson"] }],

    replies: []
  }]
  );

  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyContent, setReplyContent] = useState("");
  const [editingComment, setEditingComment] = useState(null);
  const [editContent, setEditContent] = useState("");

  const currentUser = {
    name: "You",
    avatar: "https://images.unsplash.com/photo-1532442312344-38696bc5294d",
    avatarAlt: "Professional headshot of person with short brown hair in casual shirt"
  };

  const handleAddComment = () => {
    if (!newComment?.trim()) return;

    const comment = {
      id: Date.now(),
      author: currentUser,
      content: newComment,
      timestamp: new Date(),
      isEdited: false,
      reactions: [],
      replies: []
    };

    setComments([comment, ...comments]);
    setNewComment("");
  };

  const handleAddReply = (commentId) => {
    if (!replyContent?.trim()) return;

    const reply = {
      id: Date.now(),
      author: currentUser,
      content: replyContent,
      timestamp: new Date(),
      isEdited: false
    };

    setComments(comments?.map((comment) =>
    comment?.id === commentId ?
    { ...comment, replies: [...comment?.replies, reply] } :
    comment
    ));

    setReplyingTo(null);
    setReplyContent("");
  };

  const handleEditComment = (commentId) => {
    if (!editContent?.trim()) return;

    setComments(comments?.map((comment) =>
    comment?.id === commentId ?
    { ...comment, content: editContent, isEdited: true } :
    comment
    ));

    setEditingComment(null);
    setEditContent("");
  };

  const handleReaction = (commentId, emoji) => {
    setComments(comments?.map((comment) => {
      if (comment?.id === commentId) {
        const existingReaction = comment?.reactions?.find((r) => r?.emoji === emoji);
        if (existingReaction) {
          if (existingReaction?.users?.includes(currentUser?.name)) {
            // Remove reaction
            return {
              ...comment,
              reactions: comment?.reactions?.map((r) =>
              r?.emoji === emoji ?
              { ...r, count: r?.count - 1, users: r?.users?.filter((u) => u !== currentUser?.name) } :
              r
              )?.filter((r) => r?.count > 0)
            };
          } else {
            // Add reaction
            return {
              ...comment,
              reactions: comment?.reactions?.map((r) =>
              r?.emoji === emoji ?
              { ...r, count: r?.count + 1, users: [...r?.users, currentUser?.name] } :
              r
              )
            };
          }
        } else {
          // New reaction
          return {
            ...comment,
            reactions: [...comment?.reactions, { emoji, count: 1, users: [currentUser?.name] }]
          };
        }
      }
      return comment;
    }));
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return timestamp?.toLocaleDateString();
  };

  const startEdit = (comment) => {
    setEditingComment(comment?.id);
    setEditContent(comment?.content);
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">
            Discussion ({comments?.length + comments?.reduce((acc, c) => acc + c?.replies?.length, 0)})
          </h3>
          <div className="flex items-center space-x-2">
            <div className="flex -space-x-1">
              {[currentUser, ...comments?.slice(0, 3)?.map((c) => c?.author)]?.slice(0, 4)?.map((author, index) =>
              <div
                key={index}
                className="w-6 h-6 rounded-full border-2 border-card overflow-hidden"
                style={{ zIndex: 10 - index }}>

                  <Image
                  src={author?.avatar}
                  alt={author?.avatarAlt}
                  className="w-full h-full object-cover" />

                </div>
              )}
            </div>
            <span className="text-xs text-muted-foreground">Active</span>
          </div>
        </div>
      </div>
      <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
        {/* New Comment Input */}
        <div className="flex space-x-3">
          <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
            <Image
              src={currentUser?.avatar}
              alt={currentUser?.avatarAlt}
              className="w-full h-full object-cover" />

          </div>
          <div className="flex-1 space-y-2">
            <Input
              type="text"
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e?.target?.value)}
              onKeyDown={(e) => {
                if (e?.key === 'Enter' && !e?.shiftKey) {
                  e?.preventDefault();
                  handleAddComment();
                }
              }} />

            {newComment &&
            <div className="flex items-center space-x-2">
                <Button size="sm" onClick={handleAddComment}>
                  Comment
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setNewComment("")}>
                  Cancel
                </Button>
              </div>
            }
          </div>
        </div>

        {/* Comments List */}
        <div className="space-y-4">
          {comments?.map((comment) =>
          <div key={comment?.id} className="space-y-3">
              {/* Main Comment */}
              <div className="flex space-x-3">
                <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                  src={comment?.author?.avatar}
                  alt={comment?.author?.avatarAlt}
                  className="w-full h-full object-cover" />

                </div>
                <div className="flex-1 space-y-2">
                  <div className="bg-muted rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-foreground">
                          {comment?.author?.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {formatTimestamp(comment?.timestamp)}
                        </span>
                        {comment?.isEdited &&
                      <span className="text-xs text-muted-foreground">(edited)</span>
                      }
                      </div>
                      {comment?.author?.name === currentUser?.name &&
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => startEdit(comment)}
                      iconName="Edit2"
                      className="w-6 h-6 p-0" />

                    }
                    </div>
                    
                    {editingComment === comment?.id ?
                  <div className="space-y-2">
                        <Input
                      type="text"
                      value={editContent}
                      onChange={(e) => setEditContent(e?.target?.value)} />

                        <div className="flex items-center space-x-2">
                          <Button size="sm" onClick={() => handleEditComment(comment?.id)}>
                            Save
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => setEditingComment(null)}>
                            Cancel
                          </Button>
                        </div>
                      </div> :

                  <p className="text-sm text-foreground">{comment?.content}</p>
                  }
                  </div>

                  {/* Reactions */}
                  {comment?.reactions?.length > 0 &&
                <div className="flex items-center space-x-2">
                      {comment?.reactions?.map((reaction) =>
                  <button
                    key={reaction?.emoji}
                    onClick={() => handleReaction(comment?.id, reaction?.emoji)}
                    className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs transition-colors ${
                    reaction?.users?.includes(currentUser?.name) ?
                    'bg-primary/10 text-primary' : 'bg-muted hover:bg-muted/80'}`
                    }>

                          <span>{reaction?.emoji}</span>
                          <span>{reaction?.count}</span>
                        </button>
                  )}
                    </div>
                }

                  {/* Action Buttons */}
                  <div className="flex items-center space-x-4 text-xs">
                    <button
                    onClick={() => handleReaction(comment?.id, '👍')}
                    className="text-muted-foreground hover:text-foreground transition-colors">

                      Like
                    </button>
                    <button
                    onClick={() => setReplyingTo(comment?.id)}
                    className="text-muted-foreground hover:text-foreground transition-colors">

                      Reply
                    </button>
                  </div>

                  {/* Reply Input */}
                  {replyingTo === comment?.id &&
                <div className="flex space-x-2 mt-2">
                      <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0">
                        <Image
                      src={currentUser?.avatar}
                      alt={currentUser?.avatarAlt}
                      className="w-full h-full object-cover" />

                      </div>
                      <div className="flex-1 space-y-2">
                        <Input
                      type="text"
                      placeholder="Write a reply..."
                      value={replyContent}
                      onChange={(e) => setReplyContent(e?.target?.value)}
                      onKeyDown={(e) => {
                        if (e?.key === 'Enter' && !e?.shiftKey) {
                          e?.preventDefault();
                          handleAddReply(comment?.id);
                        }
                      }} />

                        <div className="flex items-center space-x-2">
                          <Button size="sm" onClick={() => handleAddReply(comment?.id)}>
                            Reply
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => setReplyingTo(null)}>
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </div>
                }

                  {/* Replies */}
                  {comment?.replies?.length > 0 &&
                <div className="ml-4 space-y-2 border-l-2 border-border pl-4">
                      {comment?.replies?.map((reply) =>
                  <div key={reply?.id} className="flex space-x-2">
                          <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0">
                            <Image
                        src={reply?.author?.avatar}
                        alt={reply?.author?.avatarAlt}
                        className="w-full h-full object-cover" />

                          </div>
                          <div className="flex-1">
                            <div className="bg-muted rounded-lg p-2">
                              <div className="flex items-center space-x-2 mb-1">
                                <span className="text-xs font-medium text-foreground">
                                  {reply?.author?.name}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  {formatTimestamp(reply?.timestamp)}
                                </span>
                              </div>
                              <p className="text-xs text-foreground">{reply?.content}</p>
                            </div>
                          </div>
                        </div>
                  )}
                    </div>
                }
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>);

};

export default CommentThread;