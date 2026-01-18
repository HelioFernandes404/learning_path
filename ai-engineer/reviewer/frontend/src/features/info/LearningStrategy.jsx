import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../shared/ui/card';
import { Button } from '../../shared/ui/button';
import { 
  BrainCircuit, 
  Cpu, 
  Repeat, 
  Mic, 
  Headphones, 
  Code2, 
  Layers, 
  PlayCircle,
  CheckSquare,
  ArrowRight,
  Lightbulb
} from 'lucide-react';

export const LearningStrategy = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-20 animate-in fade-in duration-700">
      
      {/* Header / Executive Summary */}
      <header className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wide">
          <BrainCircuit className="h-4 w-4" /> Baseado em Evidência
        </div>
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">
          Estratégia de Aprendizagem
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Uma metodologia otimizada para <strong className="text-indigo-600">IA Engineers</strong>, combinando neurociência e adaptações para dislexia.
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-sm font-medium text-slate-500">
          <span className="flex items-center gap-1"><CheckSquare className="h-4 w-4 text-emerald-500" /> 3 Projetos Portfólio</span>
          <span className="flex items-center gap-1"><CheckSquare className="h-4 w-4 text-emerald-500" /> Pronto para Entrevistas</span>
          <span className="flex items-center gap-1"><CheckSquare className="h-4 w-4 text-emerald-500" /> 6-12 Meses</span>
        </div>
      </header>

      {/* Part 1: Foundations */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-slate-100 rounded-lg">
            <Lightbulb className="h-6 w-6 text-amber-500" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Como a Mente Aprende</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Repeat className="h-5 w-5 text-indigo-500" /> Consolidação via Recuperação
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 leading-relaxed">
                Tentar lembrar e implementar reforça a memória muito mais que a releitura passiva. 
                Cada erro corrigido é um degrau na retenção de longo prazo.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Layers className="h-5 w-5 text-purple-500" /> Intercalação (Interleaving)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 leading-relaxed">
                Misturar tipos de problemas (ex: CNN hoje, Transformer amanhã) melhora a generalização 
                e a capacidade de adaptar conceitos a novos contextos.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Part 1.2: Dyslexia Adaptations */}
      <section className="bg-slate-50 rounded-[2rem] p-8 border border-slate-200/60">
        <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <Cpu className="h-6 w-6 text-slate-600" /> Adaptações Neurodiversas
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-sm border border-slate-100">
              <Headphones className="h-5 w-5 text-blue-500" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Text-to-Speech (TTS)</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Use para documentação longa e papers. Reduz a fadiga cognitiva da leitura visual.
            </p>
          </div>
          <div className="space-y-2">
            <div className="bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-sm border border-slate-100">
              <Mic className="h-5 w-5 text-red-500" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Speech-to-Text (STT)</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Dite rascunhos e notas. Fale primeiro, refine depois. Evita bloqueio de escrita.
            </p>
          </div>
          <div className="space-y-2">
            <div className="bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-sm border border-slate-100">
              <Code2 className="h-5 w-5 text-emerald-500" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Código &gt; Texto</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Priorize exemplos executáveis. Aprenda lendo e modificando código funcional.
            </p>
          </div>
        </div>
      </section>

      {/* Part 2: The Pillars - Timeline */}
      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">O Ciclo de Aprendizado</h2>
          <span className="text-xs font-bold px-2 py-1 bg-amber-100 text-amber-700 rounded-md">
            Ciclos Curtos
          </span>
        </div>
        
        <div className="relative border-l-2 border-slate-200 pl-8 ml-4 space-y-10">
          <div className="relative">
            <span className="absolute -left-[41px] bg-slate-900 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shadow-sm ring-4 ring-white">
              0
            </span>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-indigo-300 transition-colors">
              <h4 className="font-bold text-slate-900 mb-1">Dia 0: Aprender & Implementar</h4>
              <p className="text-sm text-slate-600 mb-3">
                Consumo rápido (30m) + Implementação "do zero" (60m).
              </p>
              <div className="flex gap-2 text-xs">
                <span className="bg-slate-100 px-2 py-1 rounded text-slate-600">Tutorial TTS</span>
                <span className="bg-indigo-50 px-2 py-1 rounded text-indigo-700 font-medium">Código Real</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <span className="absolute -left-[41px] bg-slate-400 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shadow-sm ring-4 ring-white">
              2
            </span>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-indigo-300 transition-colors opacity-90">
              <h4 className="font-bold text-slate-900 mb-1">Dia 2: Refazer (Sem olhar)</h4>
              <p className="text-sm text-slate-600">
                Tente reimplementar o conceito de memória. Anote o que esqueceu.
              </p>
            </div>
          </div>

          <div className="relative">
            <span className="absolute -left-[41px] bg-slate-300 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shadow-sm ring-4 ring-white">
              7
            </span>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-indigo-300 transition-colors opacity-80">
              <h4 className="font-bold text-slate-900 mb-1">Dia 7: Variação</h4>
              <p className="text-sm text-slate-600">
                Reimplemente com uma mudança (ex: métrica diferente, dataset novo).
              </p>
            </div>
          </div>

          <div className="relative">
            <span className="absolute -left-[41px] bg-slate-200 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shadow-sm ring-4 ring-white">
              14
            </span>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-indigo-300 transition-colors opacity-70">
              <h4 className="font-bold text-slate-900 mb-1">Dia 14: Revisão & Transferência</h4>
              <p className="text-sm text-slate-600">
                Checklist rápido e conexão com novos tópicos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Optimized Workflow */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="font-bold text-slate-900 flex items-center gap-2">
            <ArrowRight className="h-4 w-4 text-slate-400" /> Entrada Otimizada
          </h3>
          <ul className="space-y-3 text-sm text-slate-600">
            <li className="flex gap-3 items-start p-3 bg-slate-50 rounded-lg">
              <span className="font-bold text-slate-400">1</span>
              <div>
                <strong className="text-slate-900 block">Exemplo Mínimo Executável</strong>
                Tutorial ou código que já roda. Baixo custo cognitivo.
              </div>
            </li>
            <li className="flex gap-3 items-start p-3 bg-slate-50 rounded-lg">
              <span className="font-bold text-slate-400">2</span>
              <div>
                <strong className="text-slate-900 block">Vídeo + Legenda/Transcrição</strong>
                Velocidade 1.5x. Use para visão geral.
              </div>
            </li>
            <li className="flex gap-3 items-start p-3 bg-slate-50 rounded-lg">
              <span className="font-bold text-slate-400">3</span>
              <div>
                <strong className="text-slate-900 block">TTS para Docs Longos</strong>
                Não leia tudo com os olhos. Ouça enquanto acompanha.
              </div>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="font-bold text-slate-900 flex items-center gap-2">
            <ArrowRight className="h-4 w-4 text-slate-400" /> Saída Otimizada
          </h3>
          <ul className="space-y-3 text-sm text-slate-600">
            <li className="flex gap-3 items-start p-3 bg-slate-50 rounded-lg">
              <span className="font-bold text-slate-400">1</span>
              <div>
                <strong className="text-slate-900 block">Ditar Rascunhos</strong>
                Use voz para documentar e comentar. É 3-5x mais rápido.
              </div>
            </li>
            <li className="flex gap-3 items-start p-3 bg-slate-50 rounded-lg">
              <span className="font-bold text-slate-400">2</span>
              <div>
                <strong className="text-slate-900 block">Templates</strong>
                Nunca comece do zero. Use esqueletos prontos para README e Docs.
              </div>
            </li>
            <li className="flex gap-3 items-start p-3 bg-slate-50 rounded-lg">
              <span className="font-bold text-slate-400">3</span>
              <div>
                <strong className="text-slate-900 block">Testes Pequenos</strong>
                Teste uma função por vez. Feedback imediato reduz frustração.
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-slate-900 rounded-[2rem] p-10 text-center text-white space-y-6 shadow-xl">
        <h3 className="text-2xl font-black">Comece seu Ciclo Hoje</h3>
        <p className="text-slate-400 max-w-lg mx-auto">
          Não fique apenas na teoria. Escolha um tópico, encontre um exemplo executável e implemente-o.
        </p>
        {onNavigate && (
          <Button 
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-6 rounded-xl font-bold text-lg transition-all"
            onClick={() => onNavigate('plan')}
          >
            <PlayCircle className="mr-2 h-5 w-5" /> Criar Plano de Estudo
          </Button>
        )}
      </section>

    </div>
  );
};
