import { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import PostEditor from './components/PostEditor';
import PostCard from './components/PostCard';
import Modal from './components/Modal';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import { Post } from './types';

function AppContent() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

  function createPost(content: string) {
    const newPost: Post = {
      id: Date.now().toString(),
      author: 'You',
      avatar: 'https://i.pravatar.cc/150?img=68',
      content,
      emoji: '👀',
      timestamp: 'Just now',
    };
    setPosts([newPost, ...posts]);
  }

  function openSignIn() {
    setAuthMode('signin');
    setShowModal(true);
  }

  function openSignUp() {
    setAuthMode('signup');
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
  }

  return (
    <div className="min-h-screen">
      <Header onLoginClick={openSignIn} />

      <main className="max-w-2xl mx-auto px-4 py-8 space-y-5">
        <PostEditor onPost={createPost} onAuthRequired={openSignIn} />

        <div className="space-y-4">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </main>

      <Modal isOpen={showModal} onClose={closeModal}>
        {authMode === 'signin' ? (
          <SignIn onClose={closeModal} onSwitchToSignUp={openSignUp} />
        ) : (
          <SignUp onClose={closeModal} onSwitchToSignIn={openSignIn} />
        )}
      </Modal>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
