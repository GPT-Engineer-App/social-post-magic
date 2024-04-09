import React, { useState } from "react";
import { Box, Button, Flex, Heading, Image, Input, Link, Text, Textarea, useToast, VStack } from "@chakra-ui/react";

import { FaTwitter, FaCog, FaPlus, FaSearch, FaCalendar } from "react-icons/fa";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [postText, setPostText] = useState("");
  const [postUrl, setPostUrl] = useState("");
  const [postImage, setPostImage] = useState("");
  const [previewText, setPreviewText] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [topics, setTopics] = useState("");
  const toast = useToast();

  const handleAuthentication = () => {
    // TODO: Implement Twitter authentication using Twitter API
    setIsAuthenticated(true);
    toast({
      title: "Authentication Successful",
      description: "You have successfully authenticated your Twitter account.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handlePostTextChange = (e) => {
    setPostText(e.target.value);
  };

  const handlePostUrlChange = (e) => {
    setPostUrl(e.target.value);
  };

  const handleTopicsChange = (e) => {
    setTopics(e.target.value);
  };

  const handleGeneratePost = () => {
    const generatedText = "This is a placeholder generated post based on the provided topics and URL.";
    setPreviewText(generatedText);

    const imageUrl = "https://images.unsplash.com/photo-1455849318743-b2233052fcff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHx0d2l0dGVyJTIwcG9zdCUyMGltYWdlfGVufDB8fHx8MTcxMjY0NDUwMHww&ixlib=rb-4.0.3&q=80&w=1080";
    setPostImage(imageUrl);
    setPreviewImage(imageUrl);
  };

  const [scheduledDate, setScheduledDate] = useState(null);

  const handleSchedulePost = () => {
    toast({
      title: "Post Scheduled",
      description: "Your post has been scheduled successfully.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    setPostText("");
    setPostUrl("");
    setPostImage("");
    setPreviewText("");
    setPreviewImage("");
  };

  return (
    <Box p={8}>
      <Flex justify="space-between" align="center" mb={8}>
        <Heading as="h1" size="xl">
          Twitter Auto Post Scheduler
        </Heading>
        <Flex>
          {isAuthenticated ? (
            <Link href="/settings">
              <Button leftIcon={<FaCog />} colorScheme="blue" mr={4}>
                Settings
              </Button>
            </Link>
          ) : (
            <Button leftIcon={<FaTwitter />} colorScheme="blue" onClick={handleAuthentication}>
              Authenticate with Twitter
            </Button>
          )}
        </Flex>
      </Flex>

      <VStack spacing={6} align="stretch">
        <Box>
          <Heading as="h2" size="lg" mb={2}>
            Create Post
          </Heading>
          <Textarea placeholder="Enter your post text" value={postText} onChange={handlePostTextChange} mb={4} />
          <Input placeholder="Enter URL (optional)" value={postUrl} onChange={handlePostUrlChange} mb={4} />
          <Input placeholder="Enter topics (comma-separated)" value={topics} onChange={handleTopicsChange} mb={4} />
          <Button leftIcon={<FaPlus />} colorScheme="blue" onClick={handleGeneratePost}>
            Generate Post
          </Button>
        </Box>

        <Box>
          <Heading as="h2" size="lg" mb={2}>
            Preview
          </Heading>
          <Box p={4} borderWidth={1} borderRadius="md">
            <Text mb={4}>{previewText}</Text>
            {previewImage && <Image src={previewImage} alt="Post Image" mb={4} />}
            <Box mb={4}>
              <Input
                type="datetime-local"
                value={scheduledDate ? scheduledDate.toISOString().slice(0, 16) : ""}
                onChange={(e) => setScheduledDate(new Date(e.target.value))}
                placeholder="Select date and time"
                icon={<FaCalendar />}
              />
            </Box>
            <Button colorScheme="blue" onClick={handleSchedulePost} isDisabled={!scheduledDate}>
              Schedule Post
            </Button>
          </Box>
        </Box>
      </VStack>
    </Box>
  );
};

export default Index;
