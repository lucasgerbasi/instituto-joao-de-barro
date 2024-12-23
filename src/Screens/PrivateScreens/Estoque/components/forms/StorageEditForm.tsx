import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { object, string, number, InferType } from "yup";
import { updateMaterial, deleteMaterial, StorageMaterialResponse } from "../../../../../services/storage/storageApi";
import { publish } from "../../../../../utils/events";
import toast from "react-hot-toast";

interface IEditFormProps {
    selectedMaterial: StorageMaterialResponse;
}

enum ORIGIN_VALUE {
    "Doação" = "DONATED",
    "Compra" = "BOUGHT"
}

const validationSchema = object({
    name: string().required("Nome do material é obrigatório"),
    quantity: number().required("Quantidade é obrigatória").positive("Informe uma quantidade válida").typeError("Quantidade deve ser um número"),
    description: string().optional(),
    origin: string().required("Origem é obrigatório")
});

type EditFormData = InferType<typeof validationSchema>;

export const StorageEditForm = ({ selectedMaterial }: IEditFormProps) => {
    const mapOriginToEnum = (origin: string) => {
        return (ORIGIN_VALUE as Record<string, string>)[origin];
    };

    const { register, handleSubmit, formState: { errors } } = useForm<EditFormData>({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            name: selectedMaterial.name,
            quantity: selectedMaterial.quantity,
            description: selectedMaterial.description,
            origin: mapOriginToEnum(selectedMaterial.origin)
        },
        mode: "onSubmit"
    });

    async function handleEditMaterial(data: EditFormData) {
        try {
            const updatedMaterial = {
                ...selectedMaterial,
                name: data.name,
                quantity: data.quantity,
                description: data.description,
                origin: data.origin
            };
            await updateMaterial(selectedMaterial.id, updatedMaterial);
            publish("storage:close-edit-modal");
            toast.success( "Material alterado com sucesso");
        } catch (error) {
            toast.error( "Falha ao alterar material");
            return error;
        }
    }
  
    async function handleDeleteMaterial() {
        try {
            await deleteMaterial(selectedMaterial.id);
            publish("storage:close-edit-modal");
            toast.success( "Material excluído com sucesso");
        } catch (error) {
            toast.error( "Falha ao excluir material");
            return error;
        }
    }

    return (
        <form className="form" onSubmit={handleSubmit(handleEditMaterial)}>
            <div className="fields-container">
                <div className="input-container">
                    <label htmlFor="name">Nome do material</label>
                    <input 
                        type="text" 
                        className="form-control"
                        {...register("name")}
                    />
                    {errors.name && <p className="input-error">{errors.name.message}</p>}
                </div>
                <div className="input-container">
                    <label htmlFor="quantity">Quantidade</label>
                    <input 
                        type="number" 
                        className="form-control"
                        {...register("quantity")}
                    />
                    {errors.quantity && <p className="input-error">{errors.quantity.message}</p>}
                </div>
                <div className="input-container">
                    <label htmlFor="description">Descrição <span className="optional">(opcional)</span></label>
                    <textarea 
                        className="form-control"
                        {...register("description")}
                    />
                </div>
                <div className="input-container">
                    <label htmlFor="origin">Origem</label>
                    <select 
                        id="origin"
                        {...register("origin")}
                        className="form-control"
                    >
                        <option value="" disabled>Selecione</option>
                        <option value="DONATED">Doação</option>
                        <option value="BOUGHT">Compra</option>
                    </select>
                    {errors.origin && <p className="input-error">{errors.origin.message}</p>}
                </div>
            </div>

            <div className="buttons-container">
                <button 
                    className="btn-secondary" 
                    type="button" 
                    onClick={handleDeleteMaterial}
                >
                    Deletar
                </button>
                <button 
                    className="btn-primary" 
                    type="submit"
                >
                    Atualizar
                </button>
            </div>
        </form>
    );
};
