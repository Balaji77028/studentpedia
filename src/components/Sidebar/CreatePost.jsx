import {
  Button,
  CloseButton,
  Flex,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { AiOutlineFilePdf } from "react-icons/ai";
import { BsFillImageFill } from "react-icons/bs";
import { IoMdAddCircle } from "react-icons/io";
import useCreatePost from "../../hooks/useCreatePost";
import useShowToast from "../../hooks/useShowToast";
import useAuthStore from "../../store/authStore";

const CreatePost = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const authUser = useAuthStore((state) => state.user);
  const [caption, setCaption] = useState("");
  const fileRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileType, setFileType] = useState(null);
  const { isLoading, handleCreatePost } = useCreatePost();
  const showToast = useShowToast();
  const [isAdmin, setIsAdmin] = useState(() => {
    const storedAdminStatus = localStorage.getItem("isAdmin");
    return storedAdminStatus === "true"; // Convert string to boolean
  });
  useEffect(() => {
    // If user is logged in and isAdmin is updated, store in local storage
    if (authUser) {
      localStorage.setItem("isAdmin", String(authUser.isAdmin));
      setIsAdmin(authUser.isAdmin);
    }
  }, [authUser]);
  // Prevent rendering if the user is not an admin
  if (!isAdmin) {
    return null;
  }
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setSelectedFile(reader.result);
        };
        reader.readAsDataURL(file);
        setFileType("image");
      } else if (file.type === "application/pdf") {
        // For PDFs, store the actual file object
        setSelectedFile(file);
        setFileType("pdf");
      } else {
        showToast("Error", "Please select an image or PDF file.", "error");
        setSelectedFile(null);
        setFileType(null);
      }
    }
  };

  const handlePostCreation = async () => {
    try {
      if (!selectedFile) {
        showToast("Error", "Please select a file to upload.", "error");
        return;
      }

      if (!caption.trim()) {
        showToast("Error", "Please add a caption.", "error");
        return;
      }

      await handleCreatePost(selectedFile, caption, fileType);
      onClose();
      setCaption("");
      setSelectedFile(null);
      setFileType(null);
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  return (
    <>
      <Tooltip
        hasArrow
        label={"Create"}
        placement="right"
        ml={1}
        openDelay={500}
        display={{ base: "block", md: "none" }}>
        <Flex
          alignItems={"center"}
          gap={4}
          // _hover={{ bg: "whiteAlpha.400" }}
          borderRadius={"50%"}
          // border={"1px solid black"}
          p={2}
          w={35}
          justifyContent={{ base: "center", md: "flex-start" }}
          onClick={onOpen}>
          <IoMdAddCircle size={30} />
          {/* <Box display={{ base: "none", md: "block" }}>Create</Box> */}
        </Flex>
      </Tooltip>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent bg={"white"} border={"1px solid gray"}>
          <ModalHeader>Create Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Textarea
              placeholder="Post caption..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              border={"0.5px solid black"}
              color={"black"}
            />
            <Input
              type="file"
              hidden
              ref={fileRef}
              onChange={handleFileChange}
              accept="image/*,application/pdf"
            />
            <Flex mt={5} alignItems="center">
              <BsFillImageFill
                onClick={() => fileRef.current.click()}
                style={{
                  marginRight: "10px",
                  cursor: "pointer",
                }}
                size={16}
              />
              <AiOutlineFilePdf
                onClick={() => fileRef.current.click()}
                style={{
                  cursor: "pointer",
                }}
                size={16}
              />
            </Flex>
            {selectedFile && (
              <Flex
                mt={5}
                w={"full"}
                position={"relative"}
                justifyContent={"center"}>
                {fileType === "image" ? (
                  <Image src={selectedFile} alt="Selected img" />
                ) : (
                  <Text>PDF file selected: {selectedFile.name}</Text>
                )}
                <CloseButton
                  position={"absolute"}
                  top={2}
                  right={2}
                  onClick={() => {
                    setSelectedFile(null);
                    setFileType(null);
                  }}
                />
              </Flex>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              mr={3}
              onClick={handlePostCreation}
              isLoading={isLoading}
              color="black"
              border={"0.2px solid black"}>
              Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreatePost;
