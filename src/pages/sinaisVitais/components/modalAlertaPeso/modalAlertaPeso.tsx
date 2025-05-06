import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { StyleProp, Text, ViewStyle } from 'react-native';
import { ISinaisVitais } from '../../../../hooks/useSinaisVitais';
import ModalCentralize, { ModalHandles } from '../../../../components/Modais/ModalCentralize';
import CardAlertaPesoPaciente from '../cardAlertaPesoPaciente/cardAlertaPesoPaciente';

// Interface para os parâmetros que podem ser passados para o modal
export interface ModalModalAlertaPesoParams {
    historicoSinaisVitais?: ISinaisVitais[];
    title?: string;
    pesoAtual?: number;
    pesoMedio?: number;
}

// Interface para os métodos expostos pelo componente via ref
export interface ModalModalAlertaPesoHandles {
    openModal: (params?: ModalModalAlertaPesoParams) => void;
    closeModal: () => void;
    isVisible: () => boolean;
}

interface ModalPesoVariacaoProps {
    style?: StyleProp<ViewStyle>;
    onConfirm?: () => void;
}

const ModalAlertaPeso = forwardRef<ModalModalAlertaPesoHandles, ModalPesoVariacaoProps>(
    ({ style, onConfirm }, ref) => {
        const [visible, setVisible] = useState(false);
        const [params, setParams] = useState<ModalModalAlertaPesoParams>({});

        const refModalCentralize = useRef<ModalHandles>(null);

        // Método para abrir o modal e definir parâmetros
        const openModal = (newParams?: ModalModalAlertaPesoParams) => {
            if (newParams) {
                setParams(newParams);
            }
            setVisible(true);
            refModalCentralize.current?.openModal();
        };

        // Método para fechar o modal
        const closeModal = () => {
            setVisible(false);
        };

        // Método para verificar se o modal está visível
        const isVisible = () => visible;

        // Expõe os métodos via ref
        useImperativeHandle(ref, () => ({
            openModal,
            closeModal,
            isVisible
        }));

        // Função para lidar com a confirmação
        const handleConfirm = () => {
            if (onConfirm) {
                onConfirm();
            }
            closeModal();
        };

        return (
            <ModalCentralize
                ref={refModalCentralize}
            >
                <CardAlertaPesoPaciente
                    historicoSinaisVitais={params.historicoSinaisVitais}
                    title={params.title}
                    pesoAtual={params.pesoAtual}
                    pesoMedio={params.pesoMedio}
                    onpress={handleConfirm}
                    onpressCancel={() => refModalCentralize.current?.closeModal()}
                />
            </ModalCentralize>
        );
    }
);

ModalAlertaPeso.displayName = 'ModalAlertaPeso';

export default ModalAlertaPeso;