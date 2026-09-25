import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { useState } from 'react';

type NewsItem = {
  id: string;
  title: string;
  summary: string;
  date: string;
  category: string;
  categoryColor: string;
  categoryText: string;
  author: string;
  featured?: boolean;
};

type QuickService = {
  id: string;
  title: string;
  bg: string;
  icon: string;
  textColor?: string;
};

const QUICK_SERVICES: QuickService[] = [
  { id: '1', title: 'Capacitaciones', bg: 'bg-[#2BA055]', icon: '📚' },
  { id: '2', title: 'Boletines', bg: 'bg-[#8CC63F]', icon: '📰' },
  { id: '3', title: 'PQRS / Atención', bg: 'bg-[#E60000]', icon: '📞' },
  { id: '4', title: 'Contáctanos', bg: 'bg-[#4A5568]', icon: '✉️' },
  { id: '5', title: 'Turno Virtual', bg: 'bg-[#008298]', icon: '📅' },
  { id: '6', title: 'Verificar Certificado', bg: 'bg-[#F8B133]', icon: '🏅', textColor: 'text-[#1A2B32]' },
];

const MOCK_NEWS: NewsItem[] = [
  {
    id: '1',
    title: 'Nueva actualización de la app lanzada oficialmente',
    summary:
      'Hemos publicado la versión 1.0.0 con soporte multiplataforma para Android, iOS y Web, usando Expo SDK 57.',
    date: '25 Sep 2026',
    category: 'Actualización',
    categoryColor: 'bg-[#8CC63F]/15',
    categoryText: 'text-[#2BA055]',
    author: 'Equipo CCDORADA',
    featured: true,
  },
  {
    id: '2',
    title: 'Nuevas funcionalidades en desarrollo',
    summary:
      'Estamos trabajando en autenticación de usuarios, perfil personalizado y sistema de notificaciones push.',
    date: '22 Sep 2026',
    category: 'Próximamente',
    categoryColor: 'bg-[#F8B133]/15',
    categoryText: 'text-[#F8B133]',
    author: 'Farid Lucktagh',
  },
  {
    id: '3',
    title: 'Bienvenidos a la nueva plataforma',
    summary:
      'Te damos la bienvenida a CCDORADA. Explora los servicios institucionales y novedades más recientes.',
    date: '20 Sep 2026',
    category: 'General',
    categoryColor: 'bg-[#2BA055]/15',
    categoryText: 'text-[#2BA055]',
    author: 'Equipo CCDORADA',
  },
  {
    id: '4',
    title: 'Mantenimiento programado',
    summary:
      'El próximo sábado habrá un mantenimiento de 30 minutos para mejorar la estabilidad del servicio.',
    date: '18 Sep 2026',
    category: 'Aviso',
    categoryColor: 'bg-[#E60000]/10',
    categoryText: 'text-[#E60000]',
    author: 'Soporte',
  },
  {
    id: '5',
    title: 'Sorteo especial para primeros usuarios',
    summary:
      'Los primeros 100 usuarios en registrarse reciben acceso anticipado a funciones premium.',
    date: '15 Sep 2026',
    category: 'Eventos',
    categoryColor: 'bg-[#008298]/15',
    categoryText: 'text-[#008298]',
    author: 'Marketing',
  },
];

const FEATURED_NEWS = MOCK_NEWS.find((n) => n.featured) ?? MOCK_NEWS[0];
const NEWS_FEED = MOCK_NEWS.filter((n) => !n.featured);

export default function NewsScreen() {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1200);
  };

  const onServicePress = (service: QuickService) => {
    console.log(`Servicio presionado: ${service.title}`);
  };

  const onNewsPress = (news: NewsItem) => {
    console.log(`Noticia presionada: ${news.title}`);
  };

  const onSeeAllPress = () => {
    console.log('Ver todas las noticias');
  };

  const onSearchPress = () => console.log('Búsqueda');
  const onNotificationPress = () => console.log('Notificaciones');
  const onHighlightPress = () => console.log('Acción destacada');

  return (
    <ScrollView
      className="flex-1 bg-[#F4F6F8]"
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor="#008298"
          colors={['#008298', '#2BA055', '#F8B133']}
        />
      }
    >
      <StatusBar barStyle="light-content" backgroundColor="#008298" />

      {/* ============================================ */}
      {/* A. HEADER / BARRA SUPERIOR                   */}
      {/* ============================================ */}
      <View className="bg-[#008298] px-5 pt-6 pb-10">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <View className="bg-white/15 h-10 w-10 rounded-lg items-center justify-center mr-3">
              <Text className="text-white text-xl font-black">C</Text>
            </View>
            <View>
              <Text className="text-white text-xl font-bold leading-none">
                CCDORADA
              </Text>
              <Text className="text-white/70 text-xs mt-1">
                Cámara de Comercio
              </Text>
            </View>
          </View>

          <View className="flex-row items-center gap-2">
            <TouchableOpacity
              onPress={onSearchPress}
              className="h-9 w-9 rounded-full bg-white/10 items-center justify-center"
              activeOpacity={0.7}
            >
              <Text className="text-white text-base">🔍</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onNotificationPress}
              className="h-9 w-9 rounded-full bg-white/10 items-center justify-center"
              activeOpacity={0.7}
            >
              <Text className="text-white text-base">🔔</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onHighlightPress}
              className="h-9 px-3 rounded-full bg-[#F8B133] flex-row items-center"
              activeOpacity={0.8}
            >
              <Text className="text-[#1A2B32] text-xs font-bold">
                Directorio
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="mt-6">
          <Text className="text-white text-xs font-semibold uppercase tracking-wider opacity-80">
            Portal Institucional
          </Text>
          <Text className="text-white/90 text-2xl font-bold mt-1 leading-tight">
            Servicios y novedades para asociados
          </Text>
        </View>
      </View>

      {/* ============================================ */}
      {/* B. BANNER PRINCIPAL / HERO DESTACADO         */}
      {/* ============================================ */}
      <View className="px-4 -mt-6">
        <View className="relative rounded-2xl overflow-hidden shadow-lg bg-[#00A7B5]">
          <View className="absolute top-[-40px] right-[-40px] h-40 w-40 rounded-full bg-white/10" />
          <View className="absolute bottom-[-30px] left-[-30px] h-32 w-32 rounded-full bg-[#2BA055]/40" />
          <View className="absolute top-20 right-10 h-16 w-16 rounded-full bg-[#F8B133]/30" />

          <View className="p-6 relative z-10">
            <View className="flex-row items-center gap-2 mb-4">
              <View className="px-3 py-1 bg-[#8CC63F] rounded-full">
                <Text className="text-white text-[11px] font-bold uppercase tracking-wider">
                  {FEATURED_NEWS.category}
                </Text>
              </View>
              <Text className="text-white/80 text-xs font-medium">
                {FEATURED_NEWS.date}
              </Text>
            </View>

            <Text className="text-white text-2xl font-bold leading-tight mb-3">
              {FEATURED_NEWS.title}
            </Text>
            <Text className="text-white/85 text-sm leading-relaxed mb-5">
              {FEATURED_NEWS.summary}
            </Text>

            <View className="flex-row items-center justify-between">
              <Text className="text-white/70 text-xs">
                Por {FEATURED_NEWS.author}
              </Text>
              <TouchableOpacity
                onPress={() => onNewsPress(FEATURED_NEWS)}
                activeOpacity={0.85}
                className="bg-white px-4 py-2.5 rounded-xl shadow-md"
              >
                <Text className="text-[#008298] text-sm font-bold">
                  Leer noticia →
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      {/* ============================================ */}
      {/* C. MÓDULO DE SERVICIOS RÁPIDOS (GRID 3x2)    */}
      {/* ============================================ */}
      <View className="px-4 mt-7">
        <View className="flex-row items-end justify-between mb-4">
          <View>
            <Text className="text-[#1A2B32] text-lg font-bold">
              Servicios Institucionales
            </Text>
            <Text className="text-[#718096] text-xs mt-0.5">
              Accesos directos a los trámites más usados
            </Text>
          </View>
        </View>

        <View className="flex-row flex-wrap justify-between">
          {QUICK_SERVICES.map((srv) => (
            <TouchableOpacity
              key={srv.id}
              onPress={() => onServicePress(srv)}
              activeOpacity={0.85}
              className={`w-[31%] ${srv.bg} p-4 rounded-2xl mb-3.5 items-center shadow-md shadow-black/5`}
            >
              <View className="bg-white/20 h-12 w-12 rounded-xl items-center justify-center mb-2.5">
                <Text className="text-2xl">{srv.icon}</Text>
              </View>
              <Text
                className={`text-xs font-bold text-center leading-tight ${
                  srv.textColor ?? 'text-white'
                }`}
              >
                {srv.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* ============================================ */}
      {/* D. SECCIÓN ÚLTIMAS NOTICIAS / FEED           */}
      {/* ============================================ */}
      <View className="px-4 mt-4 pb-10">
        <View className="flex-row items-center justify-between mb-4">
          <View>
            <Text className="text-[#1A2B32] text-lg font-bold">
              Últimas Noticias
            </Text>
            <Text className="text-[#718096] text-xs mt-0.5">
              Novedades y comunicaciones oficiales
            </Text>
          </View>
          <TouchableOpacity onPress={onSeeAllPress} activeOpacity={0.6}>
            <Text className="text-[#008298] text-sm font-semibold">
              Ver todas
            </Text>
          </TouchableOpacity>
        </View>

        {NEWS_FEED.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => onNewsPress(item)}
            activeOpacity={0.7}
            className="bg-white p-4 rounded-2xl mb-3.5 shadow-sm border border-slate-100"
          >
            <View className="flex-row items-center gap-2 mb-2.5">
              <View className={`px-2.5 py-1 rounded-full ${item.categoryColor}`}>
                <Text
                  className={`text-[11px] font-bold uppercase tracking-wide ${item.categoryText}`}
                >
                  {item.category}
                </Text>
              </View>
            </View>

            <Text className="text-[#1A2B32] text-base font-bold leading-snug mb-2">
              {item.title}
            </Text>
            <Text className="text-[#4A5568] text-sm leading-relaxed mb-3">
              {item.summary}
            </Text>

            <View className="flex-row items-center justify-between pt-2 border-t border-slate-100">
              <Text className="text-[#718096] text-xs">
                {item.date}  •  Por {item.author}
              </Text>
              <Text className="text-[#008298] text-xs font-semibold">
                Ver →
              </Text>
            </View>
          </TouchableOpacity>
        ))}

        <View className="mt-4 items-center py-6">
          <Text className="text-[#A0AEC0] text-xs">
            CCDORADA © 2026 · Todos los derechos reservados
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
