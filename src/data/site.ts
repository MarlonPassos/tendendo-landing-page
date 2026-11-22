export const site = {
  url: new URL(process.env.SITE_URL || 'https://tendendo.com'),
  email: process.env.CONTACT_EMAIL || 'tendendo.oficial@gmail.com',
  facebook: process.env.FACEBOOK_URL,
  title: 'Tendendo | Tendências, novidades e grupos de ofertas no WhatsApp',
  description: 'Descubra tendências, novidades e ofertas de tecnologia, casa, esportes e mais. Participe gratuitamente dos grupos de WhatsApp do Tendendo.',
};

export const legalLinks = {
  'politica-de-privacidade': 'Política de Privacidade',
  'termos-de-uso': 'Termos de Uso',
  'links-de-afiliados': 'Transparência sobre Links de Afiliados',
};

export const affiliate = 'Alguns links compartilhados são links de afiliados. Podemos receber comissão por compras elegíveis, sem custo adicional decorrente dessa comissão para você.';
export const pricing = 'Preços, disponibilidade, frete e promoções podem mudar sem aviso prévio. Confirme as condições finais na loja responsável.';
export const whatsappPrivacy = 'A participação é gratuita e voluntária. Ao entrar, outros participantes podem ver seu número ou informações do seu perfil, conforme as configurações do WhatsApp.';
