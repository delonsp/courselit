"use client";

import DashboardContent from "@components/admin/dashboard-content";
import { UIConstants } from "@courselit/common-models";
import {
    Button2,
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@courselit/components-library";
import { HEADER_HELP } from "@ui-config/strings";
const { permissions } = UIConstants;

const breadcrumbs = [{ label: HEADER_HELP, href: "#" }];

export default function Page() {
    return (
        <DashboardContent
            breadcrumbs={breadcrumbs}
            permissions={[
                permissions.manageAnyCourse,
                permissions.manageCourse,
                permissions.manageUsers,
                permissions.manageSite,
                permissions.manageCommunity,
                permissions.manageSettings,
            ]}
        >
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-semibold mb-4">{HEADER_HELP}</h1>
            </div>
            <p className="mb-8 text-slate-600">
                Se precisar de ajuda, estamos aqui para você.
            </p>
            <div className="flex flex-col lg:!flex-row gap-4 mb-16">
                <Card className="lg:!w-1/3">
                    <CardHeader>
                        <CardTitle>Documentação</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="mb-4">
                            Nossa documentação contém tutoriais sobre como fazer
                            tudo no CourseLit.
                        </p>
                    </CardContent>
                    <CardFooter>
                        <a href="https://docs.courselit.app" target="_blank">
                            <Button2 variant="secondary">
                                Ver documentação
                            </Button2>
                        </a>
                    </CardFooter>
                </Card>
                <Card className="lg:!w-1/3">
                    <CardHeader>
                        <CardTitle>Pergunte no Discord</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="mb-4">
                            Venha fazer suas perguntas diretamente para a
                            equipe. Somos bastante ativos lá.
                        </p>
                    </CardContent>
                    <CardFooter>
                        <a
                            href="https://discord.com/invite/GR4bQsN"
                            target="_blank"
                        >
                            <Button2 variant="secondary">Abrir Discord</Button2>
                        </a>
                    </CardFooter>
                </Card>
                <Card className="lg:!w-1/3">
                    <CardHeader>
                        <CardTitle>Encontrou um bug?</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="mb-4">
                            Encorajamos você a relatar o problema para que
                            possamos melhorar o produto para todos.
                        </p>
                    </CardContent>
                    <CardFooter>
                        <a
                            href="https://discord.com/channels/727630561895514212/1244954638747303946"
                            target="_blank"
                        >
                            <Button2 variant="secondary">
                                Relatar problema
                            </Button2>
                        </a>
                    </CardFooter>
                </Card>
            </div>
            <div>
                <h2 className="font-semibold text-2xl mb-4">
                    Suporte Prioritário
                </h2>
                <p>
                    Caso precise entrar em contato com a equipe para obter ajuda
                    mais rápida, oferecemos suporte <strong>pago</strong>. Entre
                    em contato conosco em{" "}
                    <a
                        href="mailto:support@courselit.app"
                        className="underline"
                    >
                        CourseLit Support
                    </a>{" "}
                    com suas necessidades.
                </p>
            </div>
        </DashboardContent>
    );
}
