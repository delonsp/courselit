/**
 * This file provides strings used app wide.
 */
import { UIConstants } from "@courselit/common-models";

export const responses = {
    error: "Erro",
    domain_missing: "Domínio não encontrado",
    domain_doesnt_exist: "O domínio não existe",
    domain_super_admin_email_missing:
        "A variável de ambiente SUPER_ADMIN_EMAIL não está definida",
    not_valid_subscription: "Nenhuma assinatura válida encontrada",
    sign_in_mail_prefix: "Entrar em ",
    sign_in_mail_body: "Clique no link a seguir para entrar.",
    sign_in_link_text: "Entrar",

    // graphql responses
    past_date: "A data não pode estar no passado",
    invalid_permission: "Permissão inválida",
    user_not_found: "Usuário não encontrado.",
    request_not_authenticated: "Requisição não autenticada",
    content_cannot_be_null: "O conteúdo não pode estar vazio",
    media_id_cannot_be_null: "A mídia não pode estar vazia",
    item_not_found: "Item não encontrado",
    drip_not_released: "Esta seção ainda não foi liberada para você",
    not_a_creator: "Você não tem permissão para realizar esta ação",
    course_not_empty: "Exclua todas as aulas antes de tentar excluir o curso",
    invalid_offset: "Offset inválido",
    is_not_admin: "Privilégios insuficientes",
    is_not_admin_or_creator: "Privilégios insuficientes",
    blog_description_empty: "O campo de descrição é obrigatório",
    cannot_convert_to_blog:
        "O curso possui aulas e não pode ser convertido em um post",
    cost_not_provided: "O campo de preço é obrigatório",
    invalid_cost: "Preço inválido",
    cannot_add_to_blogs: "Não é possível adicionar aulas a um post de blog",
    file_is_required: "Um arquivo é obrigatório",
    error_in_moving_file: "Erro ao mover arquivo",
    success: "sucesso",
    user_name_cant_be_null: "O nome não pode estar vazio",
    action_not_allowed: "Você não tem permissão para realizar esta ação",
    invalid_input: "Entrada inválida",
    payment_invalid_settings: "Configuração de pagamento inválida",
    payment_info_required:
        "Adicione um método de pagamento antes de criar um plano pago",
    unrecognised_currency_code: "Código de moeda não reconhecido",
    only_admins_can_purchase:
        "Apenas administradores podem comprar cursos em nome de outros",
    course_already_purchased: "Você já comprou este item",
    payment_settings_invalid_suffix: "configurações estão inválidas",
    invalid_course_id: "ID do curso inválido",
    invalid_user_id: "ID do usuário inválido",
    payment_settings_invalid:
        "Método de pagamento não configurado. Entre em contato com o administrador.",
    not_enrolled: "Você não está matriculado no curso",
    currency_iso_not_set:
        "Código ISO da moeda não definido. Entre em contato com o administrador.",
    payment_method_not_saved:
        "Configure um método de pagamento antes de definir sua chave secreta",
    invalid_payment_method: "Método de pagamento inválido",
    invalid_theme: "Tema inválido",
    theme_not_installed: "O tema não está instalado",
    invalid_layout: "Layout inválido",
    missing_mandatory_blocks: "Blocos obrigatórios ausentes",
    destination_dont_exist: "O destino não existe",
    page_exists: "Uma página com esta URL já existe",
    invalid_format: "Formato inválido",
    no_thumbnail: "Miniatura não disponível",
    file_size_exceeded: "Tamanho do arquivo excedido",
    name_is_required: "O nome é obrigatório",
    mimetype_is_required: "O tipo de mídia é obrigatório",
    existing_group: "Uma seção com esse nome já existe",
    group_not_empty: "Esta seção possui aulas. Exclua-as antes de prosseguir",
    update_payment_method:
        "Você precisa configurar um método de pagamento para criar conteúdo pago.",
    currency_iso_code_required:
        "Código ISO da moeda é obrigatório. Exemplos: usd, brl, eur etc.",
    currency_unit_required:
        "Um símbolo de moeda é obrigatório. Exemplos: $, R$, € etc.",
    school_title_not_set:
        "Dê um título à sua escola antes de configurar as informações de pagamento.",
    internal_error: "Ocorreu um erro interno. Tente novamente.",
    presigned_url_failed: "Não funcionou! Volte e tente novamente.",
    file_uploaded: "Arquivo enviado. Volte para ver sua mídia.",
    media_deleted: "Mídia excluída. Volte para ver sua mídia.",
    invalid_access_type: "O tipo de acesso pode ser público ou privado.",
    answers_missing: "Respostas ausentes.",
    cannot_be_evaluated: "Esta aula não pode ser avaliada.",
    need_to_pass:
        "Você precisa passar neste teste para marcá-lo como concluído.",
    no_correct_answer:
        "Toda pergunta precisa ter pelo menos uma resposta correta.",
    no_empty_option: "Opções sem texto não são permitidas nas perguntas.",
    medialit_apikey_notfound:
        "Você precisa configurar o MediaLit para enviar arquivos.",
    mail_already_sent: "O e-mail já foi enviado",
    mail_subject_length_exceeded: `O assunto não pode ter mais de ${UIConstants.MAIL_SUBJECT_MAX_LENGTH} caracteres`,
    mail_max_recipients_exceeded: `O número total de destinatários não pode exceder ${UIConstants.MAIL_MAX_RECIPIENTS}`,
    invalid_mail: "Os campos Para, Assunto e Corpo são obrigatórios",
    email_delivery_failed_for_all_recipients:
        "Falha no envio do e-mail para todos os destinatários",
    courses_cannot_be_downloaded:
        "Um curso não pode ser oferecido como download.",
    apikey_already_exists: "Já existe uma chave de API com esse nome",
    sequence_details_missing: "As seguintes configurações estão faltando",
    invalid_emails_order: "Ordem de e-mails inválida",
    no_published_emails: "Nenhum e-mail publicado",
    sequence_not_active: "Sequência não ativa",
    sequence_already_started: "Sequência já iniciada",
    mailing_address_too_short: "Endereço de correspondência muito curto",
    mandatory_tags_missing: "Tags obrigatórias ausentes",
    cannot_delete_last_email:
        "Não é possível excluir o último e-mail da sequência",
    invalid_drip_email: "E-mail de liberação precisa de assunto e corpo",
    cannot_invite_to_unpublished_product:
        "Não é possível convidar clientes para um produto não publicado",
    rejection_reason_missing: "Motivo da rejeição ausente",
    joining_reason_missing: "Motivo para participar obrigatório",
    invalid_category: "Categoria inválida",
    community_exists: "Uma comunidade com o mesmo nome já existe",
    payment_plan_required:
        "Adicione um plano de pagamento antes de realizar esta ação",
    community_requires_payment: "A comunidade requer pagamento",
    community_has_no_payment_plans:
        "A comunidade não possui planos de pagamento",
    duplicate_payment_plan: "Já existe um plano de pagamento do mesmo tipo",
    default_payment_plan_cannot_be_archived:
        "O plano de pagamento padrão não pode ser arquivado",
    default_payment_plan_required:
        "Marque um plano de pagamento como padrão antes de ativar a comunidade",
    community_content_already_reported: "Conteúdo já denunciado",
    profile_incomplete: "Complete seu perfil para realizar esta ação",
    cannot_reject_member_with_active_subscription:
        "Não é possível rejeitar um membro com assinatura ativa",
    cannot_leave_community_last_moderator:
        "O último gerente não pode sair da comunidade",
    cannot_change_role_inactive_member:
        "Não é possível alterar a função de um membro inativo",
    cannot_change_role_last_moderator:
        "Não é possível alterar a função do último moderador",
    cannot_delete_last_category: "Não é possível excluir a última categoria",
    lead_magnet_invalid_settings:
        "O produto deve ter exatamente um plano gratuito para habilitar lead magnet",
    certificate_invalid_settings:
        "O certificado só pode ser habilitado para cursos",

    // api responses
    digital_download_no_files:
        "Este download digital está vazio. Entre em contato com o criador.",
    download_link_expired: "O link de download expirou",
    user_already_exists: "O usuário já existe",
    unsubscribe_success:
        "Sentimos muito por você ir. Você foi descadastrado da nossa lista de e-mails.",
    download_course_cannot_have_groups: "Download digital não pode ter seções",
    download_course_last_group_cannot_be_removed:
        "A última seção não pode ser removida de um download digital",
    certificate_demo_course_id_required:
        "CourseID é obrigatório para certificado de demonstração",
};

export const internal = {
    error_unrecognised_payment_method: "Método de pagamento não reconhecido",
    error_payment_method_not_implemented: "Ainda não implementado",
    error_db_connection_failed:
        "Não foi possível estabelecer conexão com o banco de dados.",
    error_env_var_undefined:
        "Uma variável de ambiente obrigatória não está definida",
    app_running: "Servidor CourseLit está rodando em",
    invalid_cloud_storage_settings:
        "Configurações de armazenamento em nuvem inválidas",
    domain_not_specified: "Domínio não especificado",
    default_group_name: "Primeira seção",
    default_email_broadcast_subject: "Transmissão sem título",
    default_email_sequence_subject: "Primeiro e-mail",
    default_email_sequence_name: "Sequência sem título",
    joining_reason_creator: "Entrou como criador",
};
