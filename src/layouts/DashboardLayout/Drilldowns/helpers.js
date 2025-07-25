import React from "react";

// Helper function to format dates
export const formatDate = (dateString) => {
  try {
    const date = new Date(dateString);
    // Check if date is valid
    if (isNaN(date.getTime())) {
      return dateString; // Return original if not a valid date
    }
    // Format as DD/MM/YYYY
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  } catch (error) {
    return dateString; // Return original if formatting fails
  }
};

// Helper function to format datetime from UTC
export const formatDateTime = (utcString) => {
  try {
    const date = new Date(utcString);
    // Check if date is valid
    if (isNaN(date.getTime())) {
      return utcString; // Return original if not a valid date
    }
    
    // Format date as DD/MM/YYYY
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    
    // Format time as HH:MM AM/PM
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    
    return `${day}/${month}/${year} ${displayHours}:${minutes} ${ampm}`;
  } catch (error) {
    return utcString; // Return original if formatting fails
  }
};

// Helper function to check if a field is a date field
export const isDateField = (key, value) => {
  // Check if key contains date-related words
  const dateKeywords = ['date', 'created_at', 'updated_at', 'timestamp', 'time'];
  const hasDateKeyword = dateKeywords.some(keyword => key.toLowerCase().includes(keyword));
  
  // Check if value looks like a date (ISO string or timestamp)
  const looksLikeDate = typeof value === 'string' && 
    (value.match(/^\d{4}-\d{2}-\d{2}/) || // ISO date format
     value.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/)); // ISO datetime format
  
  return hasDateKeyword && looksLikeDate;
};

// Prepare table data
export const prepareTableData = (data, heading) => {
  if (!data || !Array.isArray(data)) {
    return [];
  }

  return data.map((item) => {
    const processedItem = {};

    // Replace null, undefined, empty string values with "NA"
    Object.keys(item).forEach((key) => {
      const value = item[key];
      
      // Special handling for is_sheet_connected field in Sheets Connected drilldown
      if (key === "is_sheet_connected" && heading === "Sheets Connected") {
        const isConnected = value === true || value === "true";
        processedItem[key] = (
          <span style={{ 
            color: isConnected ? '#22c55e' : '#ef4444', 
            fontWeight: 'bold' 
          }}>
            {isConnected ? "Connected" : "Not Connected"}
          </span>
        );
      }
      // Special handling for active field - show green if true, red if false
      else if (key === "active") {
        const isActive = value === true || value === "true";
        // Special styling for Campaigns drilldown
        if (heading === "Campaigns") {
          processedItem[key] = (
            <span style={{ 
              color: isActive ? '#22c55e' : '#ef4444', 
              fontWeight: 'bold' 
            }}>
              {isActive ? "Yes" : "No"}
            </span>
          );
        } else {
          processedItem[key] = (
            <span style={{ 
              color: isActive ? '#22c55e' : '#ef4444', 
              fontWeight: 'bold' 
            }}>
              {isActive ? "Active" : "Not Active"}
            </span>
          );
        }
      }
      // Special handling for sms_enabled and email_enabled fields - show green "Yes" for true, red "No" for false
      else if (key === "sms_enabled" || key === "email_enabled") {
        const isEnabled = value === true || value === "true";
        processedItem[key] = (
          <span style={{ 
            color: isEnabled ? '#22c55e' : '#ef4444', 
            fontWeight: 'bold' 
          }}>
            {isEnabled ? "Yes" : "No"}
          </span>
        );
      }
      // Special handling for campaign_started field - show green if true, red if false
      else if (key === "campaign_started") {
        const isStarted = value === true || value === "true";
        processedItem[key] = (
          <span style={{ 
            color: isStarted ? '#22c55e' : '#ef4444', 
            fontWeight: 'bold' 
          }}>
            {isStarted ? "Started" : "Not Started"}
          </span>
        );
      }
      // Special handling for is_processing field - show green if true, red if false
      else if (key === "is_processing") {
        const isProcessing = value === true || value === "true";
        processedItem[key] = (
          <span style={{ 
            color: isProcessing ? '#22c55e' : '#ef4444', 
            fontWeight: 'bold' 
          }}>
            {isProcessing ? "Processing" : "Not Processing"}
          </span>
        );
      } 
      // Special handling for fetch_url field - show Open button
      else if (key === "fetch_url" && value && value !== "null" && value !== "") {
        processedItem[key] = (
          <button
            onClick={() => window.open(value, '_blank')}
            style={{
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              padding: '6px 12px',
              fontSize: '12px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#2563eb'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#3b82f6'}
          >
            Open
          </button>
        );
      }
      // Special handling for meeting_link field - show Meet button
      else if (key === "meeting_link" && value && value !== "null" && value !== "") {
        processedItem[key] = (
          <button
            onClick={() => window.open(value, '_blank')}
            style={{
              backgroundColor: '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '8px 16px',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: '0 2px 4px rgba(16, 185, 129, 0.2)',
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#059669';
              e.target.style.transform = 'translateY(-1px)';
              e.target.style.boxShadow = '0 4px 8px rgba(16, 185, 129, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#10b981';
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 2px 4px rgba(16, 185, 129, 0.2)';
            }}
          >
            Meet
          </button>
        );
      }
      // Special handling for email_sent field in Meetings Booked - show Yes/No with border
      else if (key === "email_sent" && heading === "Meetings Booked") {
        const isSent = value === true || value === "true";
        processedItem[key] = (
          <span style={{ 
            color: isSent ? '#16a34a' : '#dc2626',
            backgroundColor: isSent ? '#f0fdf4' : '#fef2f2',
            fontWeight: 'bold',
            padding: '6px 12px',
            borderRadius: '6px',
            border: `2px solid ${isSent ? '#16a34a' : '#dc2626'}`,
            fontSize: '12px',
            display: 'inline-block',
            minWidth: '45px',
            textAlign: 'center'
          }}>
            {isSent ? "Yes" : "No"}
          </span>
        );
      }
      // Special handling for meeting_type field - style "calendly" text
      else if (key === "meeting_type") {
        if (typeof value === 'string' && value.toLowerCase() === 'calendly') {
          processedItem[key] = (
            <span style={{
              color: '#0066cc',
              fontWeight: '600',
              backgroundColor: '#e6f3ff',
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '12px'
            }}>
              Calendly
            </span>
          );
        } else {
          processedItem[key] = (
            <span style={{
              color: '#6b7280',
              fontWeight: '500',
              backgroundColor: '#f3f4f6',
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '12px'
            }}>
              {value || 'N/A'}
            </span>
          );
        }
      }
      // Special handling for meeting_status field - colorful styling
      else if (key === "meeting_status") {
        let statusColor = '#6b7280';
        let bgColor = '#f3f4f6';
        
        if (typeof value === 'string') {
          const status = value.toLowerCase();
          if (status.includes('confirmed') || status.includes('scheduled')) {
            statusColor = '#16a34a';
            bgColor = '#f0fdf4';
          } else if (status.includes('pending') || status.includes('waiting')) {
            statusColor = '#d97706';
            bgColor = '#fffbeb';
          } else if (status.includes('cancelled') || status.includes('failed')) {
            statusColor = '#dc2626';
            bgColor = '#fef2f2';
          } else if (status.includes('completed') || status.includes('attended')) {
            statusColor = '#7c3aed';
            bgColor = '#faf5ff';
          }
        }
        
        processedItem[key] = (
          <span style={{
            color: statusColor,
            fontWeight: '600',
            backgroundColor: bgColor,
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '12px',
            textTransform: 'capitalize'
          }}>
            {value || 'N/A'}
          </span>
        );
      }
      // Special handling for start_time and end_time fields in Meetings Booked - format UTC to local date/time
      else if ((key === "start_time" || key === "end_time") && heading === "Meetings Booked") {
        processedItem[key] = formatDateTime(value);
      }
      // Special handling for date fields - format to DD/MM/YYYY
      else if (isDateField(key, value)) {
        processedItem[key] = formatDate(value);
      } else if (
        value === null ||
        value === undefined ||
        value === "" ||
        value === "null"
      ) {
        processedItem[key] = "NA";
      } else {
        processedItem[key] = value;
      }
    });

    return processedItem;
  });
};

// Check if a column has any meaningful data
export const hasValidData = (data, key) => {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return false;
  }
  
  return data.some((item) => {
    const value = item[key];
    
    // Check for null, undefined, empty string, "null" string
    if (value === null || value === undefined || value === "" || value === "null") {
      return false;
    }
    
    // Check for common "empty" values
    if (typeof value === 'string') {
      const trimmedValue = value.trim().toLowerCase();
      if (trimmedValue === "" || 
          trimmedValue === "null" || 
          trimmedValue === "undefined" || 
          trimmedValue === "n/a" || 
          trimmedValue === "na" || 
          trimmedValue === "-" ||
          trimmedValue === "none" ||
          trimmedValue === "empty") {
        return false;
      }
    }
    
    // Check for zero values that might be considered empty (but allow legitimate zeros)
    if (typeof value === 'number' && value === 0) {
      // Allow zero for fields that might legitimately be zero
      const allowZeroFields = ['cost', 'price', 'amount', 'credits', 'views', 'clicks', 'impressions'];
      if (!allowZeroFields.some(field => key.toLowerCase().includes(field))) {
        return false;
      }
    }
    
    return true;
  });
};

// Format column labels with better mapping
export const formatColumnLabel = (key) => {
  const keyMappings = {
    // Common fields
    'created_at': 'Created Date',
    'updated_at': 'Updated Date',
    'deleted_at': 'Deleted Date',
    'user_id': 'User ID',
    'id': 'ID',
    
    // User/Contact fields
    'email_address': 'Email Address',
    'phone_number': 'Phone Number',
    'first_name': 'First Name',
    'last_name': 'Last Name',
    'full_name': 'Full Name',
    'display_name': 'Display Name',
    'username': 'Username',
    'user_name': 'User Name',
    'user_email': 'User Email',
    'user_phone': 'User Phone',
    
    // Company/Organization fields
    'company_name': 'Company Name',
    'company_id': 'Company ID',
    'organization': 'Organization',
    'organization_name': 'Organization Name',
    'job_title': 'Job Title',
    'position': 'Position',
    'department': 'Department',
    'role': 'Role',
    'user_role': 'User Role',
    
    // Campaign/Marketing fields
    'campaign_id': 'Campaign ID',
    'campaign_name': 'Campaign Name',
    'template_id': 'Template ID',
    'template_name': 'Template Name',
    'template_type': 'Template Type',
    'template_subject': 'Template Subject',
    'template_content': 'Template Content',
    'email_sent': 'Email Sent',
    'email_opened': 'Email Opened',
    'email_clicked': 'Email Clicked',
    'email_replied': 'Email Replied',
    'bounce_rate': 'Bounce Rate',
    'open_rate': 'Open Rate',
    'click_rate': 'Click Rate',
    'reply_rate': 'Reply Rate',
    'delivery_rate': 'Delivery Rate',
    'unsubscribe_rate': 'Unsubscribe Rate',
    
    // Lead/Prospect fields
    'lead_score': 'Lead Score',
    'lead_status': 'Lead Status',
    'prospect_id': 'Prospect ID',
    'prospect_name': 'Prospect Name',
    'prospect_email': 'Prospect Email',
    'prospect_phone': 'Prospect Phone',
    'prospect_status': 'Prospect Status',
    'contact_id': 'Contact ID',
    'contact_name': 'Contact Name',
    'contact_email': 'Contact Email',
    
    // Sheet/Integration fields
    'sheet_id': 'Sheet ID',
    'sheet_name': 'Sheet Name',
    'sheet_url': 'Sheet URL',
    'is_sheet_connected': 'Connection Status',
    'connection_status': 'Connection Status',
    'integration_type': 'Integration Type',
    'integration_status': 'Integration Status',
    
    // Activity/Meeting fields
    'meeting_id': 'Meeting ID',
    'meeting_title': 'Meeting Title',
    'meeting_date': 'Meeting Date',
    'meeting_time': 'Meeting Time',
    'meeting_status': 'Meeting Status',
    'meeting_duration': 'Meeting Duration',
    'attendees_count': 'Attendees Count',
    'booked_by': 'Booked By',
    'attended_by': 'Attended By',
    
    // Status/State fields
    'status': 'Status',
    'is_active': 'Active',
    'is_verified': 'Verified',
    'is_enabled': 'Enabled',
    'is_deleted': 'Deleted',
    'enabled': 'Enabled',
    'active': 'Active',
    'verified': 'Verified',
    
    // Categories/Types
    'category_id': 'Category ID',
    'category_name': 'Category Name',
    'type': 'Type',
    'classification': 'Classification',
    'priority': 'Priority',
    'source': 'Source',
    'origin': 'Origin',
    
    // URLs and Links
    'fetch_url': 'URL',
    'website': 'Website',
    'linkedin_url': 'LinkedIn URL',
    'social_url': 'Social URL',
    'profile_url': 'Profile URL',
    
    // Analytics/Metrics
    'views': 'Views',
    'clicks': 'Clicks',
    'impressions': 'Impressions',
    'conversions': 'Conversions',
    'engagement_rate': 'Engagement Rate',
    'success_rate': 'Success Rate',
    'completion_rate': 'Completion Rate',
    
    // Financial/Credits
    'credits': 'Credits',
    'credits_used': 'Credits Used',
    'credits_remaining': 'Credits Remaining',
    'cost': 'Cost',
    'price': 'Price',
    'amount': 'Amount',
    
    // Location fields
    'country': 'Country',
    'state': 'State',
    'city': 'City',
    'address': 'Address',
    'location': 'Location',
    'timezone': 'Timezone',
    
    // Technical fields
    'api_key': 'API Key',
    'token': 'Token',
    'version': 'Version',
    'build': 'Build',
    'environment': 'Environment',
    
    // Template specific fields
    'total_views': 'Total Views',
    'creation_status': 'Creation Status',
    'active_count': 'Active Count',
    'dynamic_url': 'Dynamic URL',
    'row': 'Row',
    'dynamic_url_for_preview': 'Preview URL',
    'last_preview_time': 'Last Preview',
    'send_count': 'Send Count',
    'campaign_started': 'Campaign Started',
    'audio': 'Audio',
    'error_count': 'Error Count',
    'is_updated': 'Updated',
    'copied': 'Copied',
    'audio_accent': 'Audio Accent',
    'is_created': 'Created',
    'is_processing': 'Processing'
  };

  if (keyMappings[key]) {
    return keyMappings[key];
  }

  // Default formatting: capitalize first letter and replace underscores with spaces
  return key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, " ");
};

// Prepare table headers
export const prepareTableHeaders = (processedData, originalData, heading) => {
  if (
    !originalData ||
    !Array.isArray(originalData) ||
    originalData.length === 0
  ) {
    return [];
  }

  const firstItem = originalData[0];
  return Object.keys(firstItem)
    .filter((key) => {
      // Always filter out id
      if (key === "id") return false;
      
      // Filter out created_by for Active Users drilldown
      if (key === "created_by" && heading === "Active Users") return false;
      
      // Show only specific columns for Templates Generated drilldown
      if (heading === "Templates Generated") {
        const allowedFields = [
          'template_name', 'template_type', 'creation_status', 
          'row', 'is_processing', 'created_at', 'active', 'campaign_started'
        ];
        if (!allowedFields.includes(key)) return false;
      }
      
      // Show only specific columns for Campaigns drilldown
      if (heading === "Campaigns") {
        const allowedFields = [
          'from_email', 'daily_sent_sms', 'max_reminders', 'total_sent_emails', 
          'weekdays_time', 'weekend_time', 'total_sent_sms', 'from_name', 
          'reply_to', 'email_enabled', 'sms_enabled', 'campaign_status', 
          'max_emails_per_day', 'daily_sent_emails', 'max_sms_per_day', 'active'
        ];
        if (!allowedFields.includes(key)) return false;
      }
      
      // Show only specific columns for Meetings Booked drilldown
      if (heading === "Meetings Booked") {
        const allowedFields = [
          'tenant_email', 'email_sent', 'user_email', 'meeting_link', 
          'start_time', 'end_time', 'meeting_type', 'meeting_status'
        ];
        if (!allowedFields.includes(key)) return false;
      }
      
      // Only include columns with valid data
      return hasValidData(originalData, key);
    })
    .map((key) => ({
      key: key,
      label: formatColumnLabel(key),
    }));
};