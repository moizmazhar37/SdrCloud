import React, { useState } from "react";
import DynamicNavigator from "src/Common/DynamicNavigator/DynamicNavigator";
import EmailForm from "../../EmailSettings/EmailSetupSections/EmailForm/EmailForm";
import styles from "./EmailTemplates.module.scss";

const EmailTemplates = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const navigationItems = [
    { text: "Settings", route: "/settings" },
    { text: "Email Templates", route: "/email-templates" },
  ];

  // Dummy email templates data
  const emailTemplates = [
    {
      id: 1,
      title: "Welcome Email",
      subject: "Welcome to Our Platform!",
      body: "Dear User,\n\nWelcome to our amazing platform! We're excited to have you on board.\n\nBest regards,\nThe Team",
      isHtmlTemplate: false,
      createdAt: "2024-01-15",
    },
    {
      id: 2,
      title: "Newsletter Template",
      subject: "Monthly Newsletter - January 2024",
      body: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
        <h1 style="color: #333; text-align: center; margin-bottom: 30px;">Monthly Newsletter</h1>
        <div style="background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #007bff; margin-bottom: 20px;">What's New This Month</h2>
          <p style="line-height: 1.6; color: #666; margin-bottom: 20px;">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <button style="background-color: #007bff; color: white; padding: 12px 24px; border: none; border-radius: 5px; cursor: pointer;">Read More</button>
        </div>
      </div>`,
      isHtmlTemplate: true,
      createdAt: "2024-01-20",
    },
    {
      id: 3,
      title: "Password Reset",
      subject: "Reset Your Password",
      body: "You requested a password reset. Please click the link below to reset your password.\n\nIf you didn't request this, please ignore this email.\n\nSecurity Team",
      isHtmlTemplate: false,
      createdAt: "2024-01-10",
    },
    {
      id: 4,
      title: "Product Launch",
      subject: "🚀 Exciting New Product Launch!",
      body: `<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 700px; margin: 0 auto; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 0; border-radius: 12px; overflow: hidden;">
        <div style="padding: 40px; text-align: center; color: white;">
          <h1 style="margin: 0 0 20px 0; font-size: 2.5em; font-weight: bold;">🚀 Product Launch</h1>
          <p style="font-size: 1.2em; margin-bottom: 30px; opacity: 0.9;">Get ready for something amazing!</p>
        </div>
        <div style="background: white; padding: 40px; margin: 0;">
          <h2 style="color: #333; margin-bottom: 20px; font-size: 1.8em;">Introducing Our Latest Innovation</h2>
          <p style="color: #666; line-height: 1.8; font-size: 1.1em; margin-bottom: 25px;">Experience the future with our groundbreaking new product that will revolutionize the way you work.</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="#" style="display: inline-block; background: linear-gradient(45deg, #667eea, #764ba2); color: white; padding: 15px 35px; text-decoration: none; border-radius: 25px; font-weight: bold; font-size: 1.1em; box-shadow: 0 4px 15px rgba(0,0,0,0.2);">Learn More</a>
          </div>
        </div>
      </div>`,
      isHtmlTemplate: true,
      createdAt: "2024-01-25",
    },
    {
      id: 5,
      title: "Support Ticket",
      subject: "Your Support Request #12345",
      body: "Thank you for contacting our support team. We have received your request and will respond within 24 hours.\n\nTicket ID: #12345\n\nSupport Team",
      isHtmlTemplate: false,
      createdAt: "2024-01-18",
    },
    {
      id: 6,
      title: "Event Invitation",
      subject: "You're Invited to Our Annual Conference",
      body: `<div style="font-family: Georgia, serif; max-width: 650px; margin: 0 auto; background: #1a1a1a; color: white; border-radius: 15px; overflow: hidden; box-shadow: 0 8px 32px rgba(0,0,0,0.3);">
        <div style="background: linear-gradient(45deg, #ff6b6b, #4ecdc4); padding: 50px 40px; text-align: center;">
          <h1 style="margin: 0; font-size: 2.8em; font-weight: normal; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">Annual Conference 2024</h1>
          <p style="margin: 20px 0 0 0; font-size: 1.3em; opacity: 0.95;">Innovation • Networking • Growth</p>
        </div>
        <div style="padding: 40px; background: white; color: #333;">
          <h2 style="color: #2c3e50; margin-bottom: 25px; font-size: 1.6em;">Join Industry Leaders</h2>
          <p style="line-height: 1.7; margin-bottom: 20px; font-size: 1.05em;">Experience three days of cutting-edge presentations, interactive workshops, and unparalleled networking opportunities.</p>
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 25px 0;">
            <p style="margin: 0; color: #666;"><strong>📅 Date:</strong> March 15-17, 2024</p>
            <p style="margin: 10px 0 0 0; color: #666;"><strong>📍 Location:</strong> Grand Convention Center</p>
          </div>
          <div style="text-align: center; margin-top: 30px;">
            <a href="#" style="display: inline-block; background: linear-gradient(45deg, #ff6b6b, #4ecdc4); color: white; padding: 15px 30px; text-decoration: none; border-radius: 30px; font-weight: bold; font-size: 1.1em;">Register Now</a>
          </div>
        </div>
      </div>`,
      isHtmlTemplate: true,
      createdAt: "2024-01-22",
    }
  ];

  const handleTemplateClick = (template) => {
    setSelectedTemplate({
      ...template,
      message: template.body, // Map body to message for EmailForm compatibility
      htmlContent: template.isHtmlTemplate ? template.body : "", // Use body as htmlContent if it's HTML
      IsHtmlTemplate: template.isHtmlTemplate
    });
    setIsEditing(true);
  };

  const handleBackToList = () => {
    setSelectedTemplate(null);
    setIsEditing(false);
  };

  const handleSave = () => {
    console.log("Save template:", selectedTemplate);
    // Add save logic here
  };

  const handleDelete = () => {
    console.log("Delete template:", selectedTemplate);
    // Add delete logic here
    handleBackToList();
  };

  const stripHtmlTags = (html) => {
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  const truncateText = (text, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  if (selectedTemplate) {
    return (
      <div className={styles.wrapper}>
        <DynamicNavigator items={navigationItems} />
        <div className={styles.formContainer}>
          <button 
            onClick={handleBackToList} 
            className={styles.backButton}
          >
            ← Back to Templates
          </button>
          <EmailForm
            subject={selectedTemplate.subject}
            setSubject={(value) => setSelectedTemplate(prev => ({ ...prev, subject: value }))}
            subjectLabel={<label className={styles.label}>Subject</label>}
            message={selectedTemplate.message}
            setMessage={(value) => setSelectedTemplate(prev => ({ 
              ...prev, 
              message: value,
              body: prev.IsHtmlTemplate ? prev.body : value // Update body if it's not HTML template
            }))}
            htmlContent={selectedTemplate.htmlContent}
            setHtmlContent={(value) => setSelectedTemplate(prev => ({ 
              ...prev, 
              htmlContent: value,
              body: prev.IsHtmlTemplate ? value : prev.body // Update body if it's HTML template
            }))}
            IsHtmlTemplate={selectedTemplate.IsHtmlTemplate}
            setHtmlTemplate={(value) => setSelectedTemplate(prev => ({ ...prev, IsHtmlTemplate: value }))}
            isEditing={isEditing}
            saveButtonText="Save Template"
            deleteButtonText="Delete Template"
            handleSave={handleSave}
            handleDelete={handleDelete}
            handleNext={() => console.log("Next clicked")}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <DynamicNavigator items={navigationItems} />
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Email Templates</h1>
          <p className={styles.subtitle}>Manage your email templates and create new ones</p>
        </div>
        
        <div className={styles.templateGrid}>
          {emailTemplates.map((template) => (
            <div 
              key={template.id} 
              className={styles.templateCard}
              onClick={() => handleTemplateClick(template)}
            >
              <div className={styles.cardHeader}>
                <div className={styles.cardTitle}>
                  <h3>{template.title}</h3>
                  {template.isHtmlTemplate && (
                    <span className={styles.htmlBadge}>HTML</span>
                  )}
                </div>
                <span className={styles.cardDate}>{template.createdAt}</span>
              </div>
              
              <div className={styles.cardContent}>
                <div className={styles.subjectSection}>
                  <span className={styles.fieldLabel}>Subject:</span>
                  <p className={styles.subject}>{template.subject}</p>
                </div>
                
                <div className={styles.bodySection}>
                  <span className={styles.fieldLabel}>Body:</span>
                  {template.isHtmlTemplate ? (
                    <div className={styles.htmlPreview}>
                      <div className={styles.htmlPreviewContainer}>
                        <iframe
                          srcDoc={template.body}
                          className={styles.previewFrame}
                          title={`Preview of ${template.title}`}
                          sandbox="allow-same-origin"
                        />
                      </div>
                      <div className={styles.htmlText}>
                        <p>{truncateText(stripHtmlTags(template.body))}</p>
                      </div>
                    </div>
                  ) : (
                    <p className={styles.bodyText}>{truncateText(template.body)}</p>
                  )}
                </div>
              </div>
              
              <div className={styles.cardFooter}>
                <span className={styles.editHint}>Click to edit</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmailTemplates;