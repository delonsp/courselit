const magicCodeEmail = `
doctype html
html
    head
        style(type='text/css').
            .courselit-branding-container {
                margin: 40px 0px;
            }
            .courselit-branding-cta {
                text-decoration: none;
                color: #000000;
                padding: 6px 10px;
                background-color: #FFFFFF;
                border: 1px solid;
                border-radius: 6px;
                text-align: center;
            }
            .email-container {
                font-family: Arial, sans-serif;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
            }
            .code-display {
                font-size: 32px;
                font-weight: bold;
                color: #2563eb;
                letter-spacing: 4px;
                margin: 20px 0;
            }
    body
        div(class="email-container")
            p Olá!
            p Seu código de verificação é:
            p(class="code-display") #{code}
            p Digite este código na tela de login para acessar sua conta.
            p
                strong IMPORTANTE:
                |   Não compartilhe este e-mail com ninguém. Qualquer pessoa pode acessar
                |   sua conta usando este código.
            p Se você não solicitou este código, ignore este e-mail.
            p Atenciosamente,
            p Equipe Academia Dr. Solution
        if !hideCourseLitBranding
            div(class="courselit-branding-container")
                a(
                    href="https://courselit.app"
                    target="_blank"
                    class="courselit-branding-cta"
                ) Powered by <strong> CourseLit </strong>
`;

export default magicCodeEmail;
