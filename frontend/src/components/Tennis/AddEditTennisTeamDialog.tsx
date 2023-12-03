import React from 'react';
import { Modal, Form, Button } from "react-bootstrap";
import { TennisTeam } from '../../models/tennis';
import { useForm } from 'react-hook-form';
import { TennisTeamInput } from '../../network/sports_api';
import * as SportApi from "../../network/sports_api";
import TextInputField from '../form/TextInputField';


interface AddEditTennisTeamDialogProps {
    tennisTeamToEdit?: TennisTeam,
    onDismiss: () => void,
    onTennisTeamSaved: (tennisTeam: TennisTeam) => void,
}


    const AddEditTennisTeamDialog = ({ tennisTeamToEdit, onDismiss, onTennisTeamSaved }: AddEditTennisTeamDialogProps) => {

    const { register, handleSubmit, formState: {errors, isSubmitting} } = useForm <TennisTeamInput>({
        defaultValues: {
            teamTitle: tennisTeamToEdit?.teamTitle || "",
            teamText: tennisTeamToEdit?.teamText || "",
        }
    });

    async function onSubmit(input: TennisTeamInput) {
        try {
            let tennisTeamResponse: TennisTeam;
            if (tennisTeamToEdit) {
                tennisTeamResponse = await SportApi.updateTennisTeam(tennisTeamToEdit._id, input);
            } else {
                tennisTeamResponse = await SportApi.createTennisTeam(input);
            }
            onTennisTeamSaved(tennisTeamResponse);
        } catch (error) {
            console.log(error);
            alert(error);
        }
    }

    return ( 
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {tennisTeamToEdit ? "Edit Tennis Team" : "Add Tennis Team"}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form id="addEditTennisTeamForm" onSubmit={handleSubmit(onSubmit)}>
                    <TextInputField 
                        name="teamTitle"
                        label="Title"
                        type="text"
                        placeholder="Title"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.teamTitle}
                    />
                    <TextInputField 
                        name="teamText"
                        label="Text"
                        as="textarea"
                        rows={5}
                        placeholder="Text"
                        register={register}
                    />
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button
                    type="submit"
                    form="addEditTennisTeamForm"
                    disabled={isSubmitting}
                >
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
     );
}
 
export default AddEditTennisTeamDialog;