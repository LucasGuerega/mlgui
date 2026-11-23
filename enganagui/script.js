        (function () {
            'use strict';

            // Estado global de edição direta
            let isEditing = false;
            let toastTimeout = null;

            /**
             * Alterna o modo de edição direta nos elementos com a classe `.editable-field`.
             */
            function toggleEditMode() {
                isEditing = !isEditing;
                const fields = document.querySelectorAll('.editable-field');
                const btnText = document.getElementById('editBtnText');

                fields.forEach((el) => {
                    el.contentEditable = String(isEditing);
                    el.classList.toggle('editable-active', isEditing);
                });

                if (btnText) {
                    btnText.textContent = isEditing ? 'Concluir edição' : 'Editar dados';
                }

                showToast(
                    isEditing
                        ? 'Modo de edição ativado: clique em qualquer texto para alterar.'
                        : 'Alterações aplicadas na tela.'
                );
            }

            /**
             * Copia o código do pedido para a área de transferência com fallback para iframe.
             */
            function copyOrderId() {
                const orderEl = document.getElementById('orderIdText');
                if (!orderEl) return;

                const cleanId = orderEl.innerText.replace('#', '').trim();
                const tempInput = document.createElement('input');
                tempInput.value = cleanId;
                document.body.appendChild(tempInput);
                tempInput.select();

                try {
                    document.execCommand('copy');
                    showToast('Número do pedido copiado: ' + cleanId);
                } catch (err) {
                    showToast('Não foi possível copiar automaticamente.');
                } finally {
                    document.body.removeChild(tempInput);
                }
            }

            /**
             * Exibe uma notificação temporária no canto inferior direito.
             * @param {string} msg - Texto da notificação
             */
            function showToast(msg) {
                const toast = document.getElementById('toast');
                if (!toast) return;

                toast.textContent = msg;
                toast.classList.remove('opacity-0');
                toast.classList.add('opacity-100');

                clearTimeout(toastTimeout);
                toastTimeout = setTimeout(() => {
                    toast.classList.remove('opacity-100');
                    toast.classList.add('opacity-0');
                }, 2800);
            }

            // Expõe funções usadas pelos atributos inline de evento
            window.toggleEditMode = toggleEditMode;
            window.copyOrderId = copyOrderId;
            window.showToast = showToast;
        })();