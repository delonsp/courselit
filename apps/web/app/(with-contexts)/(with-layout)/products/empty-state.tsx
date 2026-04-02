import { ThemeContext } from "@components/contexts";
import { useContext } from "react";
import { BookOpen } from "lucide-react";
import { Subheader1, Text2 } from "@courselit/page-primitives";

export function EmptyState({ publicView = true }: { publicView?: boolean }) {
    const { theme } = useContext(ThemeContext);

    return (
        <div className="flex flex-col items-center justify-center py-12 text-center">
            <BookOpen className="w-12 h-12 text-muted-foreground mb-4" />
            <Subheader1 theme={theme.theme}>
                Nenhum Produto Encontrado
            </Subheader1>
            <div>
                <Text2 theme={theme.theme}>
                    {publicView ? "A equipe ainda " : "Você ainda "} não
                    adicionou nenhum produto.
                </Text2>
            </div>
        </div>
    );
}
