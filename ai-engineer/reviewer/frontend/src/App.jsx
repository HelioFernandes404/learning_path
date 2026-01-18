import React, { useState, useEffect } from 'react';
import { CreateCard } from './features/cards/CreateCard';
import { CardList } from './features/cards/CardList';
import { TodayReviews } from './features/reviews/TodayReviews';
import { StudyPlan } from './features/studyPlan/StudyPlan';
import { HowItWorks } from './features/info/HowItWorks';
import { LearningStrategy } from './features/info/LearningStrategy';
import { cardApi } from './shared/api/cardApi';
import { Button } from './shared/ui/button';
import { LayoutGrid, Calendar, ListTodo, Settings, HelpCircle, BrainCircuit } from 'lucide-react';

function App() {
  const [view, setView] = useState('today'); 
  const [cards, setCards] = useState([]);

  const fetchCards = async () => {
    try {
      const response = await cardApi.getCards();
      setCards(response.data);
    } catch (error) {
      console.error('Failed to fetch cards', error);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 font-sans antialiased">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <header className="flex flex-col items-center mb-16 space-y-8">
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="bg-indigo-600 p-2.5 rounded-2xl text-white shadow-indigo-200 shadow-lg mb-2">
              <ListTodo className="h-7 w-7" />
            </div>
            <h1 className="text-4xl font-black tracking-tight text-slate-900">Reviewer</h1>
            <p className="text-slate-500 font-medium tracking-wide uppercase text-xs">O seu ritual de estudo guiado</p>
          </div>
          
          <nav className="inline-flex bg-white/80 backdrop-blur-sm p-1.5 rounded-2xl shadow-sm border border-slate-200/60 flex-wrap justify-center">
            {[
              { id: 'today', label: 'Hoje', icon: LayoutGrid },
              { id: 'plan', label: 'Plano', icon: Calendar },
              { id: 'strategy', label: 'Estratégia', icon: BrainCircuit },
              { id: 'manage', label: 'Gerenciar', icon: Settings },
              { id: 'how', label: 'Como funciona', icon: HelpCircle },
            ].map((item) => (
              <Button 
                key={item.id}
                variant={view === item.id ? 'default' : 'ghost'}
                className={`px-6 py-2 rounded-xl transition-all duration-200 ${
                  view === item.id 
                    ? 'bg-indigo-600 text-white shadow-md hover:bg-indigo-700' 
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                }`}
                onClick={() => setView(item.id)}
              >
                <item.icon className="h-4 w-4 mr-2.5" />
                <span className="font-semibold text-sm">{item.label}</span>
              </Button>
            ))}
          </nav>
        </header>

        <main className="transition-all duration-300 ease-in-out">
          {view === 'today' && (
            <TodayReviews onReviewComplete={fetchCards} />
          )}
          
          {view === 'plan' && (
            <StudyPlan />
          )}

          {view === 'strategy' && (
            <LearningStrategy onNavigate={(v) => setView(v)} />
          )}

          {view === 'how' && (
            <HowItWorks onNavigate={(v) => setView(v)} />
          )}
          
          {view === 'manage' && (
            <div className="max-w-3xl mx-auto space-y-12">
              <CreateCard onCardCreated={fetchCards} />
              <div className="pt-4">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-slate-800">Todos os Cards</h2>
                  <span className="text-xs font-bold px-2.5 py-1 bg-slate-100 text-slate-500 rounded-full">{cards.length} no total</span>
                </div>
                <CardList cards={cards} onCardDeleted={fetchCards} />
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
