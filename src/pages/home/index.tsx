import { HandPalm, Play } from "phosphor-react";
import { HomeContainer, StartContdownButton, StopContdownButton } from "./style";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from 'zod'

import { NewCycleForm } from "./newCycleForm";
import { Countdown } from "./countdown";
import { useContext } from "react";
import { CyclesContext } from "../../contexts/CyclesContext";



const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutesAmount: zod.number()
        .min(5, 'O ciclo necessita ser de no minimo 5 minutos')
        .max(60, 'O ciclo necessita ser de no maximo 60 minutos'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>


export function Home() {
    
    const { activeCycle, CreateNewCycle, InterruptCycle } = useContext(CyclesContext)
    
    const newCycleForm = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0,
        },
    })

    const { handleSubmit, watch, reset} = newCycleForm

    function handleCreateNewCycle(data: NewCycleFormData) {
        CreateNewCycle(data)
        reset()
    }


    const task = watch('task')
    const isSubmitDisabbled = !task

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">

                <FormProvider {...newCycleForm}>
                    <NewCycleForm />
                </FormProvider>

                <Countdown />

                {activeCycle ? (
                    <StopContdownButton onClick={InterruptCycle} type="button">
                        <HandPalm size={24} />
                        Interromper
                    </StopContdownButton>
                ) : (
                    <StartContdownButton disabled={isSubmitDisabbled} type="submit">
                        <Play size={24} />
                        Começar
                    </StartContdownButton>
                )
                }
            </form>
        </HomeContainer>
    )
}