import { Constants } from "@courselit/common-models";

/**
 * This file provides application wide strings.
 */
export const ERR_ALL_FIELDS_REQUIRED = "Todos os campos são obrigatórios.";
export const ERR_PASSWORDS_DONT_MATCH = "As senhas não coincidem.";
export const SIGNUP_SUCCESS =
    "Cadastro realizado com sucesso. Por favor, faça login.";
export const ERR_COURSE_TITLE_REQUIRED = "Um título é obrigatório.";
export const ERR_COURSE_COST_REQUIRED = "O preço é obrigatório.";

// Replies from the backend
export const RESP_API_USER_CREATED = "Usuário criado";

// Placeholder texts
export const CREATOR_AREA_LINK_TEXT = "Criar";
export const CREATOR_AREA_PAGE_TITLE = "Painel";
export const GENERIC_TITLE = "Minha Plataforma de Cursos";
export const GENERIC_SUBTITLE = "Aprenda novas habilidades";
export const GENERIC_LOGO_PATH = "";
export const GENERIC_SIGNIN_TEXT = "Entrar";
export const GENERIC_SIGNUP_TEXT = "Cadastrar";
export const GENERIC_SIGNOUT_TEXT = "Sair";
export const GENERIC_CURRENCY_UNIT = "";
export const GENERIC_STRIPE_PUBLISHABLE_KEY_TEXT = "";
export const GENERIC_CURRENCY_ISO_CODE = "";
export const GENERIC_PAYMENT_METHOD = "";
export const GENERIC_CODE_INJECTION_HEAD = "";

// UI texts
export const BTN_LOAD_MORE = "Carregar Mais";
export const MEDIA_UPLOAD_BUTTON_TEXT = "Enviar";
export const MEDIA_UPLOADING = "Enviando...";
export const MEDIA_ADD_NEW_BUTTON_TEXT = "Adicionar";
export const BUTTON_CANCEL_TEXT = "Cancelar";
export const BUTTON_CANCEL_SCHEDULED_MAIL = "Cancelar envio";
export const MEDIA_SEARCH_INPUT_PLACEHOLDER = "Buscar mídia";
export const LOAD_MORE_TEXT = "Carregar mais";
export const MANAGE_MEDIA_BUTTON_TEXT = "Inserir mídia";
export const MANAGE_COURSES_PAGE_HEADING = "Produtos";
export const COURSE_CUSTOMERS_PAGE_HEADING = "Clientes";
export const MANAGE_COMMUNITIES_PAGE_HEADING = "Comunidades";
export const MANAGE_PAGES_PAGE_HEADING = "Páginas";
export const BREADCRUMBS_EDIT_LESSON_COURSE_NAME = "Produto";
export const NEW_PAGE_HEADING = "Nova página";
export const USERS_MANAGER_PAGE_HEADING = "Usuários";
export const BTN_MANAGE_TAGS = "Gerenciar tags";
export const USERS_TAG_HEADER = "Tags";
export const USERS_TAG_NEW_HEADER = "Nova tag";
export const TAG_TABLE_HEADER_NAME = "Nome da tag";
export const BTN_NEW_TAG = "Nova tag";
export const TAG_TABLE_HEADER_SUBS_COUNT = "Usuários marcados";
export const TAGS_TABLE_CONTEXT_MENU_DELETE_PRODUCT = "Excluir tag";
export const TAGS_TABLE_CONTEXT_MENU_UNTAG = "Remover tags dos usuários";
export const UNTAG_POPUP_DESC =
    "Isso removerá a tag de todos os usuários marcados. Os usuários permanecerão no sistema.";
export const UNTAG_POPUP_HEADER = "Remover tag dos usuários marcados com";
export const DELETE_TAG_POPUP_HEADER = "Excluir tag";
export const DELETE_TAG_POPUP_DESC =
    "Isso removerá a tag dos usuários e excluirá a tag. Os usuários permanecerão no sistema.";
export const NEW_COURSE_PAGE_HEADING = "Adicionar curso";
export const EDIT_PRODUCT_HEADER = "Editar produto";
export const EDIT_BLOG = "Editar blog";
export const EDIT_EMAIL = "Editar e-mail";
export const MEDIA_MANAGER_DIALOG_TITLE = "Adicionar mídia";
export const BUTTON_NEW_COURSE = "Novo";
export const BUTTON_DONE_TEXT = "Concluído";
export const DIALOG_TITLE_FEATURED_IMAGE = "Selecionar mídia";
export const BUTTON_SET_FEATURED_IMAGE = "Selecionar";
export const BUTTON_SELECT_MEDIA = "Escolher mídia";
export const FORM_FIELD_FEATURED_IMAGE = "Imagem de destaque";
export const BTN_DELETE_COURSE = "Excluir produto";
export const BTN_EXIT_COURSE = "Sair";
export const BTN_EXIT_COURSE_TOOLTIP = "Sair do curso";
export const BTN_ADD_VIDEO = "Adicionar";
export const ADD_VIDEO_DIALOG_TITLE = "Incorporar vídeo online";
export const LABEL_NEW_PASSWORD = "Nova senha";
export const BUTTON_SAVE = "Salvar";
export const BUTTON_SAVING = "Salvando...";
export const GROUP_SETTINGS_HEADER = "Configurações";
export const GROUP_LESSONS_HEADER = "Aulas";
export const BUTTON_DELETE_GROUP = "Excluir Seção";
export const BTN_RESET = "Redefinir";
export const SWITCH_ACCOUNT_ACTIVE = "Conta ativa";
export const LABEL_CONF_PASSWORD = "Confirmar senha";
export const HEADER_BLOG_POSTS_SECTION = "Blog";
export const HEADER_COURSES_SECTION = "Cursos";
export const HEADER_TAG_SECTION = "Conteúdo marcado com";
export const SITE_SETTINGS_TITLE = "Título";
export const SITE_SETTINGS_SUBTITLE = "Subtítulo";
export const SITE_SETTINGS_CURRENCY = "Moeda";
export const SITE_SETTINGS_LOGO = "Logo";
export const SITE_SETTINGS_DEFAULT_TITLE = "CourseLit";
export const SITE_SETTINGS_COURSELIT_BRANDING_CAPTION =
    "Remover marca CourseLit";
export const SITE_SETTINGS_COURSELIT_BRANDING_SUB_CAPTION = `Ocultar "Powered by CourseLit" nos cursos e site.`;
export const SITE_SETTINGS_PAGE_HEADING = "Configurações";
export const HEADER_COURSELIT = "Sobre CourseLit";
export const MEDIA_SELECTOR_UPLOAD_BTN_CAPTION = "Enviar imagem";
export const MEDIA_SELECTOR_REMOVE_BTN_CAPTION = "Remover imagem";
export const SITE_ADMIN_SETTINGS_STRIPE_SECRET = "Stripe Secret Key";
export const SITE_ADMIN_SETTINGS_RAZORPAY_SECRET = "Razorpay Secret Key";
export const SITE_ADMIN_SETTINGS_RAZORPAY_WEBHOOK_SECRET =
    "Razorpay Webhook Secret";
export const SITE_ADMIN_SETTINGS_PAYPAL_SECRET = "Paypal Secret Key";
export const SITE_ADMIN_SETTINGS_PAYTM_SECRET = "Paytm Secret Key";
export const SITE_SETTINGS_SECTION_GENERAL = "Marca";
export const SITE_SETTINGS_SECTION_PAYMENT = "Pagamento";
export const SITE_ADMIN_SETTINGS_PAYMENT_METHOD = "Método de Pagamento";
export const SITE_SETTINGS_STRIPE_PUBLISHABLE_KEY_TEXT =
    "Stripe Publishable Key";
export const SITE_SETTINGS_RAZORPAY_KEY_TEXT = "Razorpay Key";
export const SITE_SETTINGS_LEMONSQUEEZY_KEY_TEXT = "Lemonsqueezy Key";
export const SITE_SETTINGS_LEMONSQUEEZY_STOREID_TEXT = "Lemonsqueezy Store ID";
export const SITE_SETTINGS_LEMONSQUEEZY_ONETIME_TEXT = "One time variant ID";
export const SITE_SETTINGS_LEMONSQUEEZY_SUB_MONTHLY_TEXT =
    "Subscription (Monthly) variant ID";
export const SITE_SETTINGS_LEMONSQUEEZY_SUB_YEARLY_TEXT =
    "Subscription (Yearly) variant ID";
export const SITE_SETTINGS_PAYMENT_METHOD_NONE_LABEL = "Nenhum";
export const FREE_COST = "GRÁTIS";
export const SIDEBAR_TEXT_COURSE_ABOUT = "Introdução";
export const REACT_COMPONENT_CRASHED =
    "Encontramos um problema ao exibir o conteúdo";
export const CHECKOUT_PAGE_TITLE = "Finalizar Compra";
export const PAYMENT_MODAL_PAYMENT_DETAILS_HEADER = "Detalhes do pagamento";
export const PAYMENT_MODAL_COST_PREFIX = "Valor";
export const PAYMENT_MODAL_PAY_NOW_BUTTON_CAPTION = "Pagar agora";
export const PAYMENT_INITIATION_FAILED =
    "Falha no processamento do pagamento. Feche esta janela e tente novamente.";
export const PAYMENT_VERIFICATION_FAILED =
    "Não foi possível verificar seu pagamento. Tente novamente.";
export const STRIPE_PUBLISHABLE_KEY_EMPTY =
    "Configuração do Stripe inválida. Entre em contato com o administrador.";
export const CAPTION_TRY_AGAIN = "Tentar novamente";
export const CAPTION_CLOSE = "Fechar";
export const LOADING = "Carregando";
export const WORKING = "Processando...";
export const BUTTON_NEW_LESSON_TEXT = "Adicionar Aula";
export const BUTTON_NEW_LESSON_TEXT_DOWNLOAD = "Adicionar Arquivo";
export const EDIT_LESSON_TEXT = "Editar Aula";
export const BUTTON_LESSON_DOWNLOAD = "Abrir em nova aba";
export const BUTTON_NEW_GROUP_TEXT = "Nova seção";
export const BUTTON_MANAGE_LESSONS_TEXT = "Gerenciar Aulas";
export const BUTTON_LESSON_VIEW_GO_BACK = "Voltar aos detalhes do curso";
export const BUTTON_DELETE_LESSON_TEXT = "Excluir";
export const COURSE_SETTINGS_CARD_HEADER = "Configurações";
export const DANGER_ZONE_HEADER = "Zona de perigo";
export const DANGER_ZONE_DESCRIPTION = "Esta ação é irreversível.";
export const DELETE_COURSE_POPUP_HEADER = "Excluir curso?";
export const POPUP_OK_ACTION = "Excluir";
export const POPUP_CANCEL_ACTION = "Cancelar";
export const BTN_BACK_TO_CONTENT = "Voltar ao conteúdo";
export const LOGIN_SECTION_HEADER = "Entrar";
export const LABEL_GROUP_NAME = "Nome";
export const LABEL_DRIP_EMAIL_SUBJECT = "Assunto";
export const LABEL_DRIP_DELAY = "Número de dias após o último envio";
export const LABEL_DRIP_DATE = "Data";
export const BTN_LOGIN = "Continuar";
export const BTN_LOGIN_NO_CODE = "Reenviar";
export const LOGIN_FORM_LABEL =
    "Digite seu email para entrar ou criar uma conta";
export const LOGIN_NO_CODE = "Não recebeu o código?";
export const BTN_LOGIN_GET_CODE = "Obter código";
export const BTN_LOGIN_CODE_INTIMATION = "Digite o código enviado para";
export const LOGIN_FORM_DISCLAIMER = "Ao enviar, você aceita os ";
export const SIGNUP_SECTION_HEADER = "Criar uma conta";
export const SIGNUP_SECTION_BUTTON = "Entrar";
export const MEDIA_MANAGER_PAGE_HEADING = "Mídia";
export const BUTTON_SEARCH = "Buscar";
export const BUTTON_ADD_FILE = "Selecionar arquivo";
export const FILE_UPLOAD_SUCCESS = "Arquivo enviado";
export const HEADER_YOUR_MEDIA = "Sua mídia";
export const BLOG_POST_SWITCH = "Post";
export const DOWNLOADABLE_SWITCH = "Para download";
export const TYPE_DROPDOWN = "Tipo";
export const LESSON_CONTENT_HEADER = "Conteúdo em Texto";
export const COURSE_CONTENT_HEADER = "Conteúdo";
export const LESSON_CONTENT_EMBED_HEADER = "Link";
export const LESSON_CONTENT_EMBED_PLACEHOLDER =
    "Link para vídeo do YouTube etc.";
export const CONTENT_URL_LABEL = "Conteúdo de mídia";
export const MEDIA_MANAGER_YOUR_MEDIA_HEADER = "Sua mídia";
export const DIALOG_SELECT_BUTTON = "Selecionar";
export const LESSON_PREVIEW = "Prévia";
export const LESSON_PREVIEW_TOOLTIP =
    "Esta aula será disponibilizada gratuitamente aos usuários.";
export const DELETE_LESSON_POPUP_HEADER = "Excluir aula";
export const APP_MESSAGE_COURSE_DELETED = "Produto excluído";
export const APP_MESSAGE_LESSON_DELETED = "Aula excluída";
export const APP_MESSAGE_LESSON_SAVED = "Detalhes da aula salvos";
export const APP_MESSAGE_COURSE_SAVED = "Alterações salvas";
export const ENROLL_IN_THE_COURSE =
    "Você precisa estar matriculado no curso para ver esta aula.";
export const NOT_ENROLLED_HEADER = "Conteúdo Bloqueado";
export const USER_ERROR_HEADER = "Ops!";
export const ENROLL_BUTTON_TEXT = "Comprar agora";
export const CHECKOUT_BUTTON_TEXT = "Finalizar Compra";
export const BUTTON_DELETE_MEDIA = "Excluir";
export const DELETE_MEDIA_POPUP_HEADER = "Excluir este arquivo?";
export const HEADER_EDITING_MEDIA = "Editar mídia";
export const MEDIA_EDITOR_HEADER_EDIT_DETAILS = "Detalhes";
export const HEADER_MEDIA_PREVIEW = "Prévia";
export const PREVIEW_PDF_FILE = "Abrir em nova aba";
export const APP_MESSAGE_MEDIA_DELETED = "Mídia excluída";
export const APP_MESSAGE_MEDIA_UPDATED = "Detalhes da mídia atualizados";
export const PAGE_HEADER_ALL_COURSES = "Cursos";
export const PAGE_HEADER_ALL_POSTS = "Blog";
export const COURSE_TYPE_BLOG = "Blog";
export const BACK_TO_BLOG = "Voltar para todos os blogs";
export const COURSE_TYPE_COURSE = "Curso";
export const COURSE_CREATOR_PREFIX = "Por";
export const APP_MESSAGE_SETTINGS_SAVED = "Configurações salvas";
export const ENROLLED_COURSES_HEADER = "Cursos matriculados";
export const SITE_APIKEYS_SETTING_HEADER = "Chaves de API";
export const SITE_MAILS_HEADER = "E-mails";
export const BROADCASTS = "Transmissões";
export const SEQUENCES = "Sequências";
export const SITE_MAILING_ADDRESS_SETTING_HEADER =
    "Endereço de Correspondência";
export const SITE_MAILING_ADDRESS_SETTING_EXPLANATION =
    "Necessário para conformidade com regulamentações de e-mail marketing.";
export const MAIL_REQUEST_RECEIVED =
    "Sua solicitação foi atualizada. Retornaremos em breve.";
export const MAIL_REQUEST_FORM_SUBMIT_INITIAL_REQUEST_TEXT = "Solicitar acesso";
export const MAIL_REQUEST_FORM_SUBMIT_UPDATE_REQUEST_TEXT = "Atualizar motivo";
export const SITE_CUSTOMISATIONS_SETTING_HEADER = "Injeção de Código";
export const SITE_CUSTOMISATIONS_SETTING_CODEINJECTION_HEAD =
    "Injeção de código no <head>";
export const SITE_CUSTOMISATIONS_SETTING_CODEINJECTION_BODY =
    "Injeção de código no <body>";
export const DISCARD_COURSE_CHANGES_POPUP_HEADER =
    "Descartar alterações feitas no curso?";
export const FEATURED_SECTION_HEADER = "Recursos em Destaque";
export const CARD_HEADER_PAGE_LAYOUT = "Layout";
export const CARD_HEADER_THEME = "Temas";
export const CARD_DESCRIPTION_PAGE_LAYOUT =
    "Use os botões '+' para adicionar componentes às seções desejadas da sua página.";
export const ADD_COMPONENT_POPUP_HEADER = "Adicionar widgets";
export const APP_MESSAGE_CHANGES_SAVED = "Alterações salvas";
export const SUBHEADER_COURSES_SECTION =
    "Aprenda novas habilidades com nossos cursos cuidadosamente elaborados.";
export const SUBHEADER_FEATURED_SECTION =
    "Recursos selecionados pelos editores.";
export const SUBHEADER_THEME_ADD_THEME = "Novo tema";
export const SUBHEADER_THEME_ADDED_THEME = "Temas instalados";
export const SUBHEADER_THEME_ADD_THEME_INPUT_LABEL = "Editor de Tema";
export const SUBHEADER_THEME_ADD_THEME_INPUT_PLACEHOLDER =
    "Cole o JSON válido aqui";
export const BUTTON_GET_THEMES = "Obter mais temas";
export const BUTTON_THEME_APPLY = "Aplicar";
export const BUTTON_THEME_UNINSTALL = "Desinstalar";
export const BUTTON_THEME_INSTALL = "Instalar";
export const BUTTON_THEME_REMIX = "Remix";
export const DELETE_THEME_POPUP_HEADER = "Desinstalar tema";
export const APPLY_THEME_POPUP_HEADER = "Aplicar tema";
export const REMIXED_THEME_PREFIX = "Remix";
export const APP_MESSAGE_THEME_COPIED = "Tema pronto para edição";
export const NO_THEMES_INSTALLED = "Nenhum tema instalado";
export const APP_MESSAGE_THEME_INSTALLED = "Tema instalado";
export const APP_MESSAGE_THEME_APPLIED = "Tema aplicado";
export const APP_MESSAGE_THEME_UNINSTALLED = "Tema desinstalado";
export const HEADER_SECTION_PAYMENT_CONFIRMATION_WEBHOOK =
    "URLs de Webhook de Pagamento";
export const SUBHEADER_SECTION_PAYMENT_CONFIRMATION_WEBHOOK =
    "Seu processador de pagamento envia notificações sobre compras. O CourseLit precisa dessas notificações para refletir corretamente as compras. Copie e cole nas configurações de webhook do seu processador de pagamento.";
export const PURCHASE_STATUS_PAGE_HEADER = "Status da Compra";
export const MAIN_MENU_ITEM_DASHBOARD = "Painel";
export const MAIN_MENU_ITEM_PROFILE = "Perfil";
export const LAYOUT_SECTION_MAIN_CONTENT = "Conteúdo Principal";
export const LAYOUT_SECTION_FOOTER_LEFT = "Seção Esquerda";
export const LAYOUT_SECTION_FOOTER_RIGHT = "Seção Direita";
export const LAYOUT_SECTION_TOP = "Topo";
export const LAYOUT_SECTION_FOOTER = "Rodapé";
export const LAYOUT_SECTION_BOTTOM = "Inferior";
export const LAYOUT_SECTION_ASIDE = "Lateral";
export const TRANSACTION_STATUS_SUCCESS = "Pagamento recebido.";
export const TRANSACTION_STATUS_SUCCESS_DETAILS =
    "Obrigado. Agora você pode acessar seu curso e começar a aprender.";
export const TRANSACTION_STATUS_INITIATED = "Pagamento Ainda Não Confirmado.";
export const TRANSACTION_STATUS_FAILED = "Pagamento Falhou.";
export const TRANSACTION_STATUS_FAILED_DETAILS =
    "O provedor de pagamento não conseguiu processar seu pagamento. Volte e tente novamente.";
export const VISIT_COURSE_BUTTON = "Acessar curso";
export const VERIFY_PAYMENT_BUTTON = "Verificar Status do Pagamento";
export const PURCHASE_ID_HEADER = "ID da Compra";
export const PAGE_HEADER_FEATURED = "Conteúdo em Destaque";
export const BTN_VIEW_ALL = "Ver todos";
export const EMPTY_COURSES_LIST_ADMIN =
    "Crie seu primeiro curso clicando no botão + no canto superior direito.";
export const HEADER_RESET_PASSWORD = "Redefinir senha";
export const HEADER_DESIGN = "Site";
export const HEADER_YOUR_PROFILE = "Seu Perfil";
export const PROFILE_PAGE_MESSAGE_NOT_LOGGED_IN = "para ver seu perfil.";
export const PROFILE_PAGE_HEADER = "Perfil";
export const MY_CONTENT_HEADER = "Meu conteúdo";
export const PROFILE_EMAIL_PREFERENCES = "Preferências de e-mail";
export const PROFILE_SECTION_DETAILS = "Dados pessoais";
export const PROFILE_SECTION_DETAILS_NAME = "Nome";
export const PROFILE_SECTION_DETAILS_EMAIL = "E-mail";
export const PROFILE_SECTION_DETAILS_BIO = "Biografia";
export const PROFILE_SECTION_DISPLAY_PICTURE = "Foto de perfil";
export const PROFILE_EMAIL_PREFERENCES_NEWSLETTER_OPTION_TEXT =
    "Receber e-mails de newsletter e marketing";
export const BTN_PUBLISH = "Publicar";
export const BTN_UNPUBLISH = "Despublicar";
export const PERM_SECTION_HEADER = "Permissões";
export const USER_BASIC_DETAILS_HEADER = "Dados básicos";
export const USER_EMAIL_SUBHEADER = "E-mail";
export const USER_NAME_SUBHEADER = "Nome";
export const USER_FILTER_CLEAR = "Limpar filtros";
export const USER_FILTER_DROPDOWN_LABEL = "Adicionar filtro";
export const USER_FILTER_BTN_LABEL = "Filtros";
export const USER_FILTER_CATEGORY_EMAIL = "E-mail";
export const USER_FILTER_CATEGORY_PRODUCT = "Produto";
export const USER_FILTER_CATEGORY_COMMUNITY = "Comunidade";
export const USER_FILTER_CATEGORY_LAST_ACTIVE = "Último acesso";
export const USER_FILTER_CATEGORY_SIGNED_UP = "Cadastrado em";
export const USER_FILTER_CATEGORY_SUBSCRIPTION = "Assinatura";
export const USER_FILTER_CATEGORY_TAGGED = "Tag";
export const USER_FILTER_CATEGORY_PERMISSION = "Permissão";
export const USER_FILTER_EMAIL_IS_EXACTLY = "É exatamente";
export const USER_FILTER_EMAIL_CONTAINS = "Contém";
export const USER_FILTER_EMAIL_NOT_CONTAINS = "Não contém";
export const USER_FILTER_PRODUCT_HAS = "Possui";
export const USER_FILTER_PRODUCT_DOES_NOT_HAVE = "Não possui";
export const USER_FILTER_COMMUNITY_HAS = "Membro de";
export const USER_FILTER_COMMUNITY_DOES_NOT_HAVE = "Não é membro de";
export const USER_FILTER_APPLY_BTN = "Aplicar";
export const USER_FILTER_SAVE = "Salvar novo segmento";
export const USER_FILTER_SAVE_DESCRIPTION =
    "Você pode acessar os segmentos salvos no menu Segmentos";
export const USER_SEGMENT_DESCRIPTION = "Separe usuários em grupos distintos.";
export const USER_FILTER_LABEL_DEFAULT = "Todos";
export const USER_FILTER_AGGREGATOR_HEADER = "Corresponder";
export const USER_FILTER_AGGREGATOR_ALL = "Todos";
export const USER_FILTER_AGGREGATOR_ANY = "Qualquer";
export const USER_FILTER_PRODUCT_DROPDOWN_LABEL = "Selecionar produto";
export const USER_FILTER_COMMUNITY_DROPDOWN_LABEL = "Selecionar comunidade";
export const USER_FILTER_TAGGED_DROPDOWN_LABEL = "Selecionar tag";
export const USER_FILTER_PERMISSION_DROPDOWN_LABEL = "Selecionar permissão";
export const USER_DELETE_SEGMENT = "Excluir Segmento";
export const USER_DELETE_SEGMENT_DESCRIPTION =
    "Tem certeza que deseja excluir ";
export const USER_FILTER_NEW_SEGMENT_NAME = "Nome do segmento";
export const USER_FILTER_SUBSCRIPTION_SUBSCRIBED = "Inscrito";
export const USER_FILTER_SUBSCRIPTION_NOT_SUBSCRIBED = "Não inscrito";
export const USER_FILTER_CHIP_TOOLTIP = "Remover filtro";
export const USER_FILTER_PERMISSION_HAS = "Possui";
export const USER_FILTER_PERMISSION_DOES_NOT_HAVE = "Não possui";
export const USER_FILTER_LAST_ACTIVE_BEFORE = "Antes de";
export const USER_FILTER_LAST_ACTIVE_AFTER = "Depois de";
export const USER_FILTER_LAST_ACTIVE_ON = "Em";
export const USER_FILTER_SIGNED_UP_BEFORE = "Antes de";
export const USER_FILTER_SIGNED_UP_AFTER = "Depois de";
export const USER_FILTER_SIGNED_UP_ON = "Em";
export const USER_FILTER_DATE_RANGE_DROPDOWN_LABEL = "Selecionar data";
export const DOCUMENTATION_LINK_LABEL = "Saiba mais";
export const PERM_COURSE_MANAGE = "Gerenciar produtos";
export const PERM_COURSE_MANAGE_ANY = "Gerenciar todos os produtos";
export const PERM_COURSE_PUBLISH = "Publicar conteúdo";
export const PERM_ENROLL_IN_COURSE = "Comprar produtos";
export const PERM_MEDIA_MANAGE = "Gerenciar arquivos";
export const PERM_MEDIA_MANAGE_ANY = "Gerenciar todos os arquivos";
export const PERM_SITE = "Gerenciar páginas";
export const PERM_SETTINGS = "Gerenciar configurações";
export const PERM_USERS = "Gerenciar usuários";
export const PERM_MANAGE_COMMUNITY = "Gerenciar comunidade";
export const MEDIA_EDITOR_ORIGINAL_FILE_NAME_HEADER = "Nome do Arquivo";
export const GROUP_LESSON_ITEM_UNTITLED = "Sem título";
export const SECTION_GROUP_HEADER = "Seções";
export const ERROR_SIGNIN_GENERATING_LINK =
    "Erro ao gerar link de acesso. Tente novamente.";
export const ERROR = "Parece haver um problema!";
export const SIGNIN_SUCCESS_PREFIX = "Um link de acesso foi enviado para";
export const ERROR_SIGNIN_VERIFYING_LINK =
    "Não foi possível fazer seu login. Tente novamente.";
export const COURSE_STRUCTURE_SELECT_LESSON =
    "Selecione uma aula na área de Seções.";
export const ERROR_GROUP_NEW_LESSON_WITHOUT_SAVE =
    "Salve as configurações da seção primeiro";
export const LABEL_GROUP_COLLAPSE = "Mostrar expandido";
export const SEARCH_TEXTBOX_PLACEHOLDER = "Buscar";
export const PAGE_TITLE_404 = "Não encontrado";
export const MEDIA_PUBLIC = "Disponível publicamente";
export const MEDIA_DIRECT_URL = "URL Direta";
export const MEDIA_URL_COPIED = "Copiado para a área de transferência";
export const MEDIA_FILE_TYPE = "Tipo de arquivo";
export const UNABLE_TO_LOGOUT = "Falha ao sair. Tente novamente.";
export const LOGOUT = "Sair";
export const LOGGING_OUT = "Saindo...";
export const LOGOUT_MESSAGE = "Tem certeza que deseja sair?";
export const USER_TABLE_HEADER_NAME = "Detalhes";
export const USER_TABLE_HEADER_STATUS = "Status";
export const USER_TABLE_HEADER_PRODUCTS = "Produtos";
export const USER_TABLE_HEADER_COMMUNITIES = "Comunidades";
export const USER_TABLE_HEADER_JOINED = "Cadastrado";
export const USER_TABLE_HEADER_LAST_ACTIVE = "Último acesso";
export const USER_TABLE_HEADER_EMAIL = "E-mail";
export const USER_TABLE_HEADER_NAME_NAME = "Nome";
export const USER_SEGMENT_DROPDOWN_LABEL = "Segmentos";
export const USER_TYPE_TOOLTIP =
    "Separe usuários com base em suas funções. Usuários de audiência podem se matricular em cursos. Usuários de equipe têm direitos administrativos.";
export const DIALOG_DONE_BUTTON = "Concluído";
export const DIALOG_EDIT_WIDGET_PREFIX = "Editar";
export const PRODUCTS_TABLE_HEADER_NAME = "Título";
export const PRODUCTS_TABLE_HEADER_TYPE = "Tipo";
export const PRODUCTS_TABLE_HEADER_STATUS = "Status";
export const PRODUCTS_TABLE_HEADER_STUDENTS = "Alunos";
export const PRODUCTS_TABLE_HEADER_SALES = "Vendas";
export const PRODUCTS_TABLE_HEADER_ACTIONS = "Ações";
export const PRODUCT_STATUS_DRAFT = "Rascunho";
export const PRODUCT_STATUS_PUBLISHED = "Publicado";
export const PRODUCT_TABLE_CONTEXT_MENU_DELETE_PRODUCT = "Excluir";
export const PRODUCT_TABLE_CONTEXT_MENU_EDIT_PAGE = "Editar página";
export const PRODUCT_TABLE_CONTEXT_MENU_INVITE_A_CUSTOMER = "Convidar cliente";
export const BTN_INVITE = "Convidar";
export const BTN_GO_BACK = "Voltar";
export const BTN_NEW_PRODUCT = "Novo produto";
export const BTN_NEW_PAGE = "Nova página";
export const PAGE_HEADER_NEW_PRODUCT = "Novo Produto";
export const FORM_NEW_PRODUCT_TITLE = "Título";
export const FORM_NEW_PRODUCT_TYPE = "Tipo de produto";
export const FORM_NEW_PRODUCT_TITLE_PLC =
    "ex: 'Introdução à Medicina Funcional'";
export const FORM_NEW_PRODUCT_SELECT = "Tipo de produto";
export const BTN_CONTINUE = "Continuar";
export const DELETE_PRODUCT_POPUP_HEADER = "Excluir produto";
export const DELETE_PRODUCT_POPUP_TEXT =
    "Esta ação é irreversível e todos os dados e análises relacionados a este produto serão excluídos.";
export const FORM_NEW_PRODUCT_MENU_COURSE_SUBTITLE =
    "Um curso interativo com imagens, vídeos, texto e mais.";
export const FORM_NEW_PRODUCT_MENU_DOWNLOADS_SUBTITLE =
    "Um arquivo ZIP contendo imagens, vídeos, texto e mais.";
export const NEW_SECTION_HEADER = "Nova Seção";
export const EDIT_SECTION_DRIP = "Liberação Programada";
export const DRIP_SECTION_STATUS = "Ativar Liberação Programada";
export const EDIT_SECTION_HEADER = "Editar Seção";
export const DELETE_SECTION_HEADER = "Excluir seção";
export const PRICING_HEADER = "Preços";
export const PRICING_DROPDOWN = "Modelo de preço";
export const PRICING_FREE = Constants.ProductPriceType.FREE;
export const PRICING_FREE_SUBTITLE =
    "O conteúdo pode ser acessado gratuitamente. O usuário precisa estar logado.";
export const PRICING_EMAIL = Constants.ProductPriceType.EMAIL;
export const PRICING_EMAIL_LABEL = "Entrega por e-mail gratuita";
export const PRICING_EMAIL_SUBTITLE =
    "O conteúdo será enviado por e-mail. O usuário não precisa estar logado.";
export const PRICING_PAID = Constants.ProductPriceType.PAID;
export const PRICING_PAID_LABEL = "Pago";
export const PRICING_FREE_LABEL = "Gratuito";
export const PAYMENT_PLAN_FREE_LABEL = "Gratuito";
export const PAYMENT_PLAN_ONETIME_LABEL = "Pagamento único";
export const PAYMENT_PLAN_SUBSCRIPTION_LABEL = "Assinatura";
export const PAYMENT_PLAN_EMI_LABEL = "Parcelado";
export const PRICING_PAID_SUBTITLE =
    "O conteúdo pode ser acessado após pagamento único. O usuário precisa estar logado.";
export const PRICING_PAID_NO_PAYMENT_METHOD =
    "Configure um método de pagamento em Configurações para habilitar esta opção.";
export const PUBLISH_TAB_STATUS_TITLE = "Status";
export const PUBLISH_TAB_STATUS_SUBTITLE =
    "Torne seu curso público ou privado.";
export const PUBLISH_TAB_VISIBILITY_TITLE = "Visibilidade";
export const PUBLISH_TAB_VISIBILITY_SUBTITLE =
    "O produto fica oculto e só pode ser acessado por URL direta.";
export const PAGE_TITLE_EDIT_PAGE = "Editar";
export const PAGE_TITLE_VIEW_PAGE = "Visualizar";
export const PAGE_HEADER_EDIT_PAGE = "Editar página";
export const EDIT_PAGE_MENU_ITEM = "Editar página";
export const VIEW_PAGE_MENU_ITEM = "Ver página";
export const EDIT_PAGE_BUTTON_UPDATE = "Publicar";
export const EDIT_PAGE_BUTTON_VIEW = "Visualizar";
export const EDIT_PAGE_BUTTON_DONE = "Sair";
export const EDIT_PAGE_ADD_WIDGET_TITLE = "Novo bloco";
export const EDIT_PAGE_WIDGET_LIST_HEADER = "Blocos da página";
export const THEMES_TABLE_HEADER_NAME = "Nome";
export const ACCOUNT_PROGRESS_SUFFIX = "% Concluído";
export const CHECKOUT_PAGE_TOTAL = "Total";
export const COURSE_PROGRESS_PREV = "Anterior";
export const COURSE_PROGRESS_INTRO = "Introdução";
export const COURSE_PROGRESS_NEXT = "Concluir e continuar";
export const COURSE_PROGRESS_START = "Iniciar";
export const COURSE_PROGRESS_FINISH = "Concluir e finalizar";
export const BTN_NEW_BLOG = "Novo blog";
export const MANAGE_BLOG_PAGE_HEADING = "Blogs";
export const BLOG_TABLE_HEADER_NAME = "Título";
export const PAGE_HEADER_NEW_BLOG = "Novo blog";
export const MENU_BLOG_VISIT = "Visitar blog";
export const ACCOUNT_NO_PURCHASE_PLACEHOLDER =
    "Seus cursos matriculados aparecerão aqui.";
export const EXPORT_CSV = "Exportar para CSV";
export const GENERIC_FAILURE_MESSAGE = "Algo deu errado. Tente novamente.";
export const LESSON_QUIZ_ADD_QUESTION = "Adicionar pergunta";
export const LESSON_QUIZ_ADD_OPTION_BTN = "Adicionar opção";
export const LESSON_QUIZ_CONTENT_HEADER = "Pergunta";
export const LESSON_QUIZ_OPTIONS_HEADER = "Opções";
export const LESSON_QUIZ_QUESTION_PLACEHOLDER = "Digite a pergunta aqui";
export const LESSON_QUIZ_OPTION_PLACEHOLDER = "Digite a opção aqui";
export const QUESTION_BUILDER_CORRECT_ANS_TOOLTIP =
    "Marcar como resposta correta";
export const QUESTION_BUILDER_EXPAND_TOOLTIP = "Expandir";
export const QUESTION_BUILDER_COLLAPSE_TOOLTIP = "Recolher";
export const LESSON_QUIZ_GRADED_TEXT =
    "Este quiz requer nota mínima para aprovação";
export const QUIZ_VIEWER_EVALUATE_BTN = "Enviar";
export const QUIZ_VIEWER_EVALUATE_BTN_LOADING = "Verificando...";
export const QUIZ_SCORE_PREFIX_MESSAGE = "Você acertou";
export const COURSE_STUDENT_REPORT_HEADER = "Alunos";
export const COURSE_STUDENT_TABLE_HEADER_PROGRESS = "Progresso";
export const COURSE_STUDENT_TABLE_HEADER_DOWNLOAD = "Baixado";
export const COURSE_STUDENT_TABLE_HEADER_SIGNED_UP_ON = "Matriculado em";
export const COURSE_STUDENT_TABLE_HEADER_LAST_ACCESSED_ON = "Último acesso";
export const COURSE_STUDENT_SEARCH_BY_TEXT = "Buscar aluno";
export const COURSE_STUDENT_NO_RECORDS = "Nenhum aluno encontrado";
export const QUESTION_BUILDER_DELETE_TOOLTIP = "Excluir pergunta";
export const PAGE_HEADER_EDIT_MAIL = "Escrever e-mail";
export const PAGE_HEADER_EDIT_SEQUENCE = "Detalhes da sequência";
export const BTN_SEND = "Enviar";
export const DIALOG_SEND_HEADER = "Enviar e-mail";
export const BTN_SCHEDULE = "Agendar";
export const ERROR_SUBJECT_EMPTY = "O assunto não pode estar vazio";
export const ERROR_DELAY_EMPTY = "A data agendada deve ser no futuro";
export const FORM_MAIL_SCHEDULE_TIME_LABEL = "Enviar em";
export const BTN_SENDING = "Enviando";
export const MAIL_SUBJECT_PLACEHOLDER = "Assunto";
export const MAIL_PREVIEW_TITLE = "Texto de Prévia";
export const COMPOSE_SEQUENCE_FORM_TITLE = "Nome da sequência";
export const COMPOSE_SEQUENCE_ENTRANCE_CONDITION_DATA =
    "Dados da condição de entrada";
export const COMPOSE_SEQUENCE_FORM_FROM = "De";
export const COMPOSE_SEQUENCE_FROM_PLC = "Seu Nome";
export const COMPOSE_SEQUENCE_ENTRANCE_CONDITION = "Condição de entrada";
export const COMPOSE_SEQUENCE_EDIT_DELAY = "Atraso";
export const MAIL_TO_PLACEHOLDER = "Para";
export const MAIL_BODY_PLACEHOLDER = "Conteúdo do e-mail";
export const PAGE_HEADER_ALL_MAILS = "E-mails";
export const SIDEBAR_MENU_MAILS = "E-mails";
export const SIDEBAR_MENU_USERS = "Usuários";
export const SIDEBAR_MENU_SETTINGS = "Configurações";
export const SIDEBAR_MENU_PAGES = "Páginas";
export const SIDEBAR_MENU_PRODUCTS = "Produtos";
export const SIDEBAR_MENU_DASHBOARD = "Início";
export const SIDEBAR_MENU_BLOGS = "Blogs";
export const PAGE_HEADER_EDIT_USER = "Editar usuário";
export const PAGE_HEADER_ALL_USER = "Todos os usuários";
export const TOAST_MAIL_SENT = "E-mail agendado para envio";
export const PAGE_PLACEHOLDER_MAIL = "Seus e-mails aparecerão aqui";
export const BTN_NEW_MAIL = "Nova transmissão";
export const BTN_NEW_SEQUENCE = "Nova sequência";
export const MAIL_TABLE_HEADER_SUBJECT = "Assunto";
export const MAIL_TABLE_HEADER_RECEPIENTS = "Nº de destinatários";
export const MAIL_SENDER_YOU = "Você";
export const MAIL_TABLE_HEADER_SENDER = "Remetente";
export const MAIL_TABLE_HEADER_STATUS = "Status";
export const MAIL_TABLE_HEADER_ENTRANTS = "Inscritos";
export const MAIL_TABLE_HEADER_SENT_ON = "Enviado em";
export const TOOLTIP_USER_PAGE_SEND_MAIL = "Enviar e-mail para a seleção atual";
export const EDIT_PAGE_BUTTON_FONTS = "Fontes";
export const EDIT_PAGE_BUTTON_THEME = "Tema";
export const EDIT_PAGE_BUTTON_SEO = "SEO";
export const SEO_FORM_NAME_LABEL = "Título";
export const SEO_FORM_DESC_LABEL = "Descrição";
export const SEO_FORM_ROBOTS_LABEL = "Visibilidade nos mecanismos de busca";
export const SEO_FORM_SOCIAL_IMAGE_LABEL = "Imagem para redes sociais";
export const SEO_FORM_SOCIAL_IMAGE_TOOLTIP =
    "Ao compartilhar esta página em redes sociais como Twitter ou Facebook, esta imagem será usada.";
export const EDIT_PAGE_SEO_HEADER = "SEO";
export const EDIT_PAGE_HEADER_ALL_PAGES = "Páginas";
export const LOGIN_SECTION_EMAIL_INVALID = "E-mail inválido";
export const COMPONENT_MISSING_SUFFIX = "componente não encontrado.";
export const LESSON_GROUP_DELETED = "Seção excluída";
export const USER_PERMISSION_AREA_SUBTEXT =
    "Controle quais ações este usuário pode realizar na sua escola.";
export const APIKEY_NEW_BUTTON = "Nova chave de API";
export const APIKEY_EXISTING_HEADER = "Suas chaves de API";
export const APIKEY_EXISTING_TABLE_HEADER_CREATED = "Criada em";
export const APIKEY_EXISTING_TABLE_HEADER_NAME = "Nome";
export const APIKEY_NEW_HEADER = "Nova chave de API";
export const APIKEY_NEW_LABEL = "Nome";
export const APIKEY_NEW_BTN_CAPTION = "Criar";
export const APIKEY_NEW_GENERATED_KEY_HEADER = "Sua nova chave de API";
export const APIKEY_NEW_GENERATED_KEY_DESC =
    "Copie e guarde em local seguro. Você não poderá vê-la novamente.";
export const APIKEY_NEW_GENERATED_KEY_COPIED =
    "Copiado para a área de transferência";
export const APIKEY_REMOVE_BTN = "Remover";
export const APIKEY_REMOVE_DIALOG_HEADER = "Remover Chave de API";
export const APIKYE_REMOVE_DIALOG_DESC =
    "Se você está usando esta chave na sua aplicação, removê-la quebrará a integração. Esta ação não pode ser desfeita.";
export const USER_TAGS_SUBHEADER = "Tags";
export const PAGES_TABLE_HEADER_NAME = "Nome";
export const PAGES_TABLE_HEADER_ACTIONS = "Ações";
export const NEW_PAGE_NAME_PLC = "Minha página incrível";
export const NEW_PAGE_URL_LABEL = "URL";
export const NEW_PAGE_URL_PLC = "minha-pagina-incrivel";
export const DELETE_PAGE_POPUP_HEADER = "Excluir página?";
export const DELETE_PAGE_POPUP_TEXT =
    "Esta ação é irreversível e todos os dados relacionados a esta página serão excluídos.";
export const PAGE_TABLE_CONTEXT_MENU_DELETE = "Excluir";
export const APP_MESSAGE_PAGE_DELETED = "Página excluída";
export const APP_MESSAGE_MAIL_DELETED = "E-mail excluído";
export const NEW_PAGE_FORM_WARNING =
    "Estas configurações não podem ser alteradas posteriormente, então prossiga com cuidado.";
export const DASHBOARD_PAGE_HEADER = "Bem-vindo";
export const UNNAMED_USER = "Visitante";
export const MAIL_REQUEST_FORM_REASON_FIELD = "Motivo";
export const MAIL_REQUEST_FORM_REASON_PLACEHOLDER =
    "Por favor, seja o mais detalhado possível. Isso nos ajudará a avaliar sua solicitação.";
export const DASHBOARD_SELECT_HEADER = "Período";
export const DELETE_EMAIL_MENU = "Excluir";
export const DELETE_EMAIL_DIALOG_HEADER = "Excluir e-mail";
export const OVERVIEW_HEADER = "Visão Geral";
export const HELP_HEADER = "Ajuda";
export const COMMUNITY_HEADER = "Comunidade";
export const COMMUNITY_MEMBERSHIP_LIST_HEADER = "Membros";
export const COMMUNITY_REPORTS_HEADER = "Conteúdo denunciado";
export const COMMUNITY_REPORTS_SUBHEADER =
    "Revise e gerencie conteúdo denunciado na sua comunidade";
export const COMMUNITY_MEMBERSHIP_LIST_SUBHEADER =
    "Revise e gerencie membros da sua comunidade";
export const SITE_SETTINGS_SECTION_COMMUNITIES = "Comunidades";
export const NEW_COMMUNITY_BUTTON = "Nova comunidade";
export const COMMUNITY_FIELD_NAME = "Nome da comunidade";
export const COMMUNITY_NEW_BTN_CAPTION = "Criar";
export const COMMUNITY_SETTINGS = "Gerenciar";

// Payment Plan strings
export const NEW_PAYMENT_PLAN_HEADER = "Novo Plano de Pagamento";
export const EDIT_PAYMENT_PLAN_HEADER = "Editar Plano de Pagamento";
export const PAYMENT_PLANS_HEADER = "Planos de Pagamento";
export const NEW_PAYMENT_PLAN_DESCRIPTION =
    "Configure um novo plano de pagamento para seu";
export const EDIT_PAYMENT_PLAN_DESCRIPTION = "Atualize a configuração para";
export const TOAST_TITLE_SUCCESS = "Sucesso";
export const TOAST_SEQUENCE_SAVED =
    "Alterações da sequência salvas com sucesso";
export const TOAST_QUIZ_PASS_MESSAGE = "Aprovado 🎉";
export const TOAST_QUIZ_FAIL_MESSAGE = "Reprovado ☠️";
export const TOAST_TITLE_ERROR = "Erro";
export const TOAST_DESCRIPTION_CHANGES_SAVED = "Alterações salvas";
export const DELETED_COMMENT_PLACEHOLDER = "Excluído";
export const SETTINGS_RESOURCE_PAYMENT = "Configurar pagamento";
export const SETTINGS_RESOURCE_API = "Documentação da API";
export const EDIT_CONTENT_MENU_ITEM = "Editar conteúdo";
export const PRODUCT_UNPUBLISHED_WARNING =
    "Este produto não está publicado. Ele não está visível para seu público.";
export const SEQUENCE_UNPUBLISHED_WARNING =
    "Esta sequência não está programada para envio. Inicie-a para enviar ao seu público.";
export const PRODUCT_EMPTY_WARNING =
    "Seu produto está vazio. Adicione conteúdo para torná-lo interessante.";
export const BLOG_UPDATED_PREFIX = "Atualizado";
export const HEADER_HELP = "Ajuda";
export const CHECKOUT_PAGE_ORDER_SUMMARY = "Resumo do pedido";
export const TEXT_EDITOR_PLACEHOLDER = "Digite aqui...";
export const BTN_VIEW_CERTIFICATE = "Ver certificado";
export const GET_SET_UP = "Configurar";
