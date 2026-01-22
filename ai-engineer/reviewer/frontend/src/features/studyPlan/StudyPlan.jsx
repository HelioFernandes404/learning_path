import React, { useState, useEffect } from 'react';
import { cardApi } from '../../shared/api/cardApi';
import { Card, CardHeader, CardTitle, CardContent } from '../../shared/ui/card';
import { Button } from '../../shared/ui/button';
import { Input } from '../../shared/ui/input';
import { PlusCircle, Calendar, Trash2 } from 'lucide-react';

export const StudyPlan = () => {
  const [months, setMonths] = useState([]);
  const [cards, setCards] = useState([]);
  const [newMonthTitle, setNewMonthTitle] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [monthsRes, cardsRes] = await Promise.all([
        cardApi.getMonths(),
        cardApi.getCards()
      ]);
      setMonths(monthsRes.data);
      setCards(cardsRes.data);
    } catch (error) {
      console.error('Error fetching study plan', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMonth = async () => {
    if (!newMonthTitle) return;
    try {
      await cardApi.createMonth({
        title: newMonthTitle,
        number: months.length + 1
      });
      setNewMonthTitle('');
      fetchData();
    } catch (error) {
      console.error('Error adding month', error);
    }
  };

  const handleDeleteMonth = async (monthId) => {
    if (!confirm('Tem certeza que deseja deletar este módulo? Todos os cards associados serão mantidos, mas perderão a referência ao módulo.')) {
      return;
    }
    try {
      await cardApi.deleteMonth(monthId);
      fetchData();
    } catch (error) {
      console.error('Error deleting month', error);
    }
  };

  if (loading) return (
    <div className="p-20 text-center space-y-4">
      <div className="animate-spin inline-block w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full" />
      <p className="text-slate-500 font-medium italic">Organizando seu currículo...</p>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-8">
        <div className="space-y-1">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <div className="p-2 bg-indigo-50 rounded-lg">
              <Calendar className="h-6 w-6 text-indigo-600" />
            </div>
            Plano de Estudo
          </h2>
          <p className="text-slate-500 font-medium">Sua jornada dividida em blocos mensais de foco.</p>
        </div>
        
        <div className="flex gap-3 bg-white p-2 rounded-2xl shadow-sm border border-slate-200/60">
          <Input 
            placeholder="Título do novo módulo..." 
            value={newMonthTitle}
            onChange={(e) => setNewMonthTitle(e.target.value)}
            className="w-64 border-0 focus-visible:ring-0 bg-transparent font-medium"
          />
          <Button onClick={handleAddMonth} size="sm" className="bg-indigo-600 hover:bg-indigo-700 rounded-xl px-4 font-bold shadow-md shadow-indigo-100 transition-all hover:-translate-y-0.5">
            <PlusCircle className="h-4 w-4 mr-2" /> Novo Mês
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {months.map((month) => {
          const monthCards = cards.filter(c => c.month_id === month.id);
          return (
            <Card key={month.id} className="group border-0 shadow-sm hover:shadow-xl hover:shadow-indigo-100/40 transition-all duration-300 bg-white overflow-hidden ring-1 ring-slate-200/60 rounded-3xl">
              <div className="h-2 bg-indigo-600/10 group-hover:bg-indigo-600 transition-colors duration-300" />
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">Módulo {month.number}</span>
                    <CardTitle className="text-xl font-bold text-slate-800 pt-1">{month.title}</CardTitle>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <span className="text-xs font-black text-slate-400 group-hover:text-indigo-600 transition-colors">
                        {monthCards.length} {monthCards.length === 1 ? 'CARD' : 'CARDS'}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteMonth(month.id)}
                      className="h-8 w-8 hover:bg-red-50 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {monthCards.length > 0 ? (
                    <div className="space-y-2.5">
                      {monthCards.slice(0, 4).map(card => (
                        <div key={card.id} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50/50 border border-transparent hover:border-slate-100 hover:bg-white transition-all group/item">
                          <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-300 group-hover/item:bg-indigo-400 transition-colors" />
                          <p className="text-sm font-medium text-slate-600 group-hover/item:text-slate-900 transition-colors line-clamp-2">
                            {card.question}
                          </p>
                        </div>
                      ))}
                      {monthCards.length > 4 && (
                        <div className="pt-2 text-center">
                          <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">
                            + {monthCards.length - 4} tópicos adicionais
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="py-10 text-center border-2 border-dashed border-slate-100 rounded-2xl">
                      <p className="text-xs text-slate-400 font-medium italic">Nenhum tópico cadastrado ainda.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
        
        {months.length === 0 && (
          <div className="col-span-full py-24 text-center space-y-4 bg-white rounded-[2rem] border-2 border-dashed border-slate-200 shadow-inner shadow-slate-50">
            <div className="inline-flex p-4 bg-slate-50 rounded-full text-slate-300">
              <Calendar className="h-10 w-10" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-800">Seu plano está vazio</h3>
              <p className="text-slate-400 text-sm max-w-xs mx-auto">Comece definindo o seu primeiro mês de foco para organizar seus estudos.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
