import React, { useEffect } from 'react';
import { TennisPlayer, TennisTeam } from '../../models/tennis';
import { Modal, Form, Button } from 'react-bootstrap';
import TextInputField from '../form/TextInputField';
import { useForm } from 'react-hook-form';
import { TennisPlayerInput } from '../../network/sports_api';
import * as SportApi from "../../network/sports_api";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';



interface AddEditTennisPlayerDialogProps {
    tennisTeamId: string,
    tennisPlayerToEdit?: TennisPlayer | null,
    onDismiss: () => void,
    onTennisPlayerSaved: (tennisPlayer: TennisPlayer) => void,
}

const AddEditTennisPlayerDialog = ({tennisTeamId, tennisPlayerToEdit, onDismiss, onTennisPlayerSaved }: AddEditTennisPlayerDialogProps) => {


    const { register, handleSubmit, setValue, formState: {errors, isSubmitting} } = useForm<TennisPlayerInput>({
        defaultValues: {
            playerFirstName: tennisPlayerToEdit?.playerFirstName || "",
            playerSecondName: tennisPlayerToEdit?.playerSecondName || "",
            dateOfBirth: tennisPlayerToEdit?.dateOfBirth || "",
            playerNote: tennisPlayerToEdit?.playerNote || "",
            playerScore: tennisPlayerToEdit?.playerScore || 0,
            playerWon: tennisPlayerToEdit?.playerWon || 0,
            playerLost: tennisPlayerToEdit?.playerLost || 0,
        }
    });

    async function onSubmit(input: TennisPlayerInput) {
        try {
            let tennisPlayerResponse: TennisPlayer;
            if (tennisPlayerToEdit) {
                tennisPlayerResponse = await SportApi.updateTennisPlayer(tennisTeamId, tennisPlayerToEdit._id, input);
            } else {
                tennisPlayerResponse = await SportApi.createTennisPlayer(tennisTeamId, input);
            }
            onTennisPlayerSaved(tennisPlayerResponse);
        } catch (error) {
            console.log(error);
            alert(error);
        }
    }

    return (
        <Modal show onHide={onDismiss} >
            <Modal.Header>
                <Modal.Title>
                    {tennisPlayerToEdit ? "Edit Tennis Player" : "Add Tennis Player"}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form id="addEditTennisPlayerForm" onSubmit={handleSubmit(onSubmit)}>
                    <TextInputField 
                        name="playerFirstName"
                        label="First Name"
                        type="text"
                        placeholder="First Name"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.playerFirstName}
                    />
                    <TextInputField 
                        name="playerSecondName"
                        label="Second Name"
                        type="text"
                        placeholder="Second Name"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.playerSecondName}
                    />
                    {/* <TextInputField 
                        name="dateOfBirth"
                        label="Date Of Birth"
                        type="date"
                        placeholder="Date Of Birth"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.dateOfBirth} // don't use update
                    /> */}
                    <div>
                        <label>Date Of Birth</label>
                        <DatePicker 
                            selected={tennisPlayerToEdit?.dateOfBirth ? new Date(tennisPlayerToEdit.dateOfBirth) : null}
                            onChange={(date) => {
                                setValue("dateOfBirth", date ? date.toISOString().split('T')[0] : '', { shouldValidate: true });
                            }}
                            dateFormat="dd.MM.yyyy"           
                        />
                        {errors.dateOfBirth && <span>{errors.dateOfBirth.message}</span>}
                    </div>
                    <TextInputField 
                        name="playerNote"
                        label="Player Note"
                        type="text"
                        placeholder="Player Note"
                        register={register}
                        error={errors.playerNote}
                    />
                </Form>

                <Modal.Footer>
                <Button
                    type="submit"
                    form="addEditTennisPlayerForm"
                    disabled={isSubmitting}
                >
                    Save
                </Button>
            </Modal.Footer>
            </Modal.Body>
        </Modal>
    )
}

export default AddEditTennisPlayerDialog;
