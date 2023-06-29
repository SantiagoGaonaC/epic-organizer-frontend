import React, { forwardRef, useState } from "react";
import {
  FormControl,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Modal,
  Checkbox,
  Editable,
  EditablePreview,
  EditableTextarea,
  Tag,
  TagLabel,
  TagCloseButton,
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
export const MyModalTask = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [startDate, setStartDate] = useState(new Date());
  console.log(startDate);
  return {
    isOpen,
    onOpen,
    onClose,
    ModalComponent: (
      <>
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
          isCentered
          size={"xl"}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <Editable defaultValue="Título de la tarea">
                <EditablePreview />
                <EditableTextarea />
              </Editable>
              <Tag
                size={"lg"}
                key={"lg"}
                borderRadius="full"
                variant="solid"
                colorScheme="green"
              >
                <TagLabel>Green</TagLabel>
                <TagCloseButton />
              </Tag>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <DatePicker
                dateFormat="MM/dd/yyyy"
                selected={startDate}
                onChange={(date: Date) => setStartDate(date)}
              />
              <Checkbox isDisabled={false}>Hecho</Checkbox>
              <FormControl mt={4}>
                <Editable defaultValue="D e t a l l e s . . .">
                  <EditablePreview />
                  <EditableTextarea
                    style={{ height: "200px", overflow: "auto" }}
                  />
                </Editable>
              </FormControl>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    ),
  };
};
