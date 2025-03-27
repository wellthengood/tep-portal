import React, { useState, useEffect, useRef } from 'react';
import { useFormContext } from '../contexts/FormContext';

const RFCExemptionForm = () => {
  const { isRFCFormOpen, closeRFCForm } = useFormContext();
  
  const [formData, setFormData] = useState({
    businessApplication: '',
    deployableUnit: '',
    isCustomerFacing: 'No',
    isImpact5KBS: 'No',
    hasDownstreamImpact: 'No',
    isHighPriority: 'No',
    requiresApproval: 'No',
    hasTestingCompleted: 'No',
    businessJustification: ''
  });
  
  const [formStep, setFormStep] = useState(1);
  const modalRef = useRef();
  const formRef = useRef();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const nextStep = () => {
    setFormStep(formStep + 1);
  };
  
  const prevStep = () => {
    setFormStep(formStep - 1);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    
    // Process comma-separated values
    const processedData = {
      ...formData,
      businessApplication: formData.businessApplication.split(',').map(item => item.trim()),
      deployableUnit: formData.deployableUnit.split(',').map(item => item.trim()),
      // Convert string values to boolean for the Yes/No fields
      isCustomerFacing: formData.isCustomerFacing === 'Yes',
      isImpact5KBS: formData.isImpact5KBS === 'Yes',
      hasDownstreamImpact: formData.hasDownstreamImpact === 'Yes',
      isHighPriority: formData.isHighPriority === 'Yes',
      requiresApproval: formData.requiresApproval === 'Yes',
      hasTestingCompleted: formData.hasTestingCompleted === 'Yes'
    };
    
    console.log('Processed form data:', processedData);
    
    // Here you would typically send the data to an API
    setFormStep(3); // Show success step
  };
  
  const handleClickOutside = (e) => {
    if (modalRef.current && !formRef.current.contains(e.target)) {
      closeRFCForm();
    }
  };
  
  useEffect(() => {
    if (isRFCFormOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('mousedown', handleClickOutside);
      setFormStep(1); // Reset to first step when opening
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isRFCFormOpen]);
  
  if (!isRFCFormOpen) return null;
  
  // Helper component for Yes/No radio options
  const YesNoOptions = ({ label, name, value }) => (
    <div className="radio-option-group fancy-radio">
      <div className="radio-option-label">{label}</div>
      <div className="radio-options">
        <label className="radio-label">
          <input
            type="radio"
            name={name}
            value="Yes"
            checked={value === 'Yes'}
            onChange={handleChange}
          />
          <span className="radio-text">Yes</span>
        </label>
        <label className="radio-label">
          <input
            type="radio"
            name={name}
            value="No"
            checked={value === 'No'}
            onChange={handleChange}
          />
          <span className="radio-text">No</span>
        </label>
      </div>
    </div>
  );
  
  return (
    <div className="modal-overlay fancy-modal" ref={modalRef}>
      <div className="rfc-form-container" ref={formRef}>
        <div className="rfc-form-header">
          <div className="form-header-content">
            <div className="header-icon">
              <i className="fas fa-file-alt"></i>
            </div>
            <h2>RFC Exemption Request</h2>
          </div>
          <button className="close-button" onClick={closeRFCForm}>×</button>
        </div>
        
        <div className="form-progress">
          <div className={`progress-step ${formStep >= 1 ? 'active' : ''}`}>
            <div className="step-number">1</div>
            <div className="step-label">Details</div>
          </div>
          <div className="progress-line"></div>
          <div className={`progress-step ${formStep >= 2 ? 'active' : ''}`}>
            <div className="step-number">2</div>
            <div className="step-label">Confirmation</div>
          </div>
          <div className="progress-line"></div>
          <div className={`progress-step ${formStep >= 3 ? 'active' : ''}`}>
            <div className="step-number">3</div>
            <div className="step-label">Complete</div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="rfc-form">
          {formStep === 1 && (
            <div className="form-step-content step-1">
              <div className="form-section-title">
                <i className="fas fa-building section-icon"></i>
                <h3>Application Information</h3>
              </div>
              
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="businessApplication">
                    Business Applications (L2)
                    <span className="input-hint">Separate multiple entries with commas</span>
                  </label>
                  <div className="fancy-input">
                    <i className="fas fa-sitemap input-icon"></i>
                    <input
                      type="text"
                      id="businessApplication"
                      name="businessApplication"
                      value={formData.businessApplication}
                      onChange={handleChange}
                      required
                      placeholder="e.g. APM001112, APM001113"
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="deployableUnit">
                    Deployable Units (L3)
                    <span className="input-hint">Separate multiple entries with commas</span>
                  </label>
                  <div className="fancy-input">
                    <i className="fas fa-box input-icon"></i>
                    <input
                      type="text"
                      id="deployableUnit"
                      name="deployableUnit"
                      value={formData.deployableUnit}
                      onChange={handleChange}
                      required
                      placeholder="e.g. DU012345, DU012346"
                    />
                  </div>
                </div>
              </div>
              
              <div className="form-section-title">
                <i className="fas fa-clipboard-check section-icon"></i>
                <h3>Impact Assessment</h3>
              </div>
              
              <div className="options-section">
                <div className="options-row">
                  <YesNoOptions
                    label="Is customer facing app?"
                    name="isCustomerFacing"
                    value={formData.isCustomerFacing}
                  />
                  
                  <YesNoOptions
                    label="Is impact 5 KBS flow?"
                    name="isImpact5KBS"
                    value={formData.isImpact5KBS}
                  />
                </div>
                
                <div className="options-row">
                  <YesNoOptions
                    label="Do you have downstream service impact?"
                    name="hasDownstreamImpact"
                    value={formData.hasDownstreamImpact}
                  />
                  
                  <YesNoOptions
                    label="Is this high priority request?"
                    name="isHighPriority"
                    value={formData.isHighPriority}
                  />
                </div>
                
                <div className="options-row">
                  <YesNoOptions
                    label="Requires manager approval?"
                    name="requiresApproval"
                    value={formData.requiresApproval}
                  />
                  
                  <YesNoOptions
                    label="Has testing been completed?"
                    name="hasTestingCompleted"
                    value={formData.hasTestingCompleted}
                  />
                </div>
              </div>
              
              <div className="form-section-title">
                <i className="fas fa-comment-alt section-icon"></i>
                <h3>Justification</h3>
              </div>
              
              <div className="form-group full-width">
                <label htmlFor="businessJustification">Business Justification</label>
                <div className="fancy-textarea">
                  <textarea
                    id="businessJustification"
                    name="businessJustification"
                    value={formData.businessJustification}
                    onChange={handleChange}
                    required
                    placeholder="Please provide detailed business justification for the RFC exemption request..."
                    rows="6"
                  ></textarea>
                </div>
              </div>
              
              <div className="form-actions">
                <button type="button" className="btn btn-secondary" onClick={closeRFCForm}>
                  Cancel
                </button>
                <button type="button" className="btn btn-primary" onClick={nextStep}>
                  Review Request
                  <i className="fas fa-arrow-right ml-2"></i>
                </button>
              </div>
            </div>
          )}
          
          {formStep === 2 && (
            <div className="form-step-content step-2">
              <div className="form-section-title">
                <i className="fas fa-check-circle section-icon"></i>
                <h3>Review Your Information</h3>
              </div>
              
              <div className="review-section">
                <div className="review-group">
                  <h4>Business Applications (L2)</h4>
                  <p>{formData.businessApplication || "None provided"}</p>
                </div>
                
                <div className="review-group">
                  <h4>Deployable Units (L3)</h4>
                  <p>{formData.deployableUnit || "None provided"}</p>
                </div>
                
                <div className="review-options">
                  <div className="review-option">
                    <span className="option-label">Customer Facing App:</span>
                    <span className={`option-value ${formData.isCustomerFacing === 'Yes' ? 'yes' : 'no'}`}>
                      {formData.isCustomerFacing}
                    </span>
                  </div>
                  
                  <div className="review-option">
                    <span className="option-label">Impact 5 KBS Flow:</span>
                    <span className={`option-value ${formData.isImpact5KBS === 'Yes' ? 'yes' : 'no'}`}>
                      {formData.isImpact5KBS}
                    </span>
                  </div>
                  
                  <div className="review-option">
                    <span className="option-label">Downstream Service Impact:</span>
                    <span className={`option-value ${formData.hasDownstreamImpact === 'Yes' ? 'yes' : 'no'}`}>
                      {formData.hasDownstreamImpact}
                    </span>
                  </div>
                  
                  <div className="review-option">
                    <span className="option-label">High Priority Request:</span>
                    <span className={`option-value ${formData.isHighPriority === 'Yes' ? 'yes' : 'no'}`}>
                      {formData.isHighPriority}
                    </span>
                  </div>
                  
                  <div className="review-option">
                    <span className="option-label">Requires Manager Approval:</span>
                    <span className={`option-value ${formData.requiresApproval === 'Yes' ? 'yes' : 'no'}`}>
                      {formData.requiresApproval}
                    </span>
                  </div>
                  
                  <div className="review-option">
                    <span className="option-label">Testing Completed:</span>
                    <span className={`option-value ${formData.hasTestingCompleted === 'Yes' ? 'yes' : 'no'}`}>
                      {formData.hasTestingCompleted}
                    </span>
                  </div>
                </div>
                
                <div className="review-group">
                  <h4>Business Justification</h4>
                  <p className="justification-text">{formData.businessJustification || "None provided"}</p>
                </div>
              </div>
              
              <div className="form-actions">
                <button type="button" className="btn btn-secondary" onClick={prevStep}>
                  <i className="fas fa-arrow-left mr-2"></i>
                  Back to Edit
                </button>
                <button type="submit" className="btn btn-primary">
                  Submit Request
                  <i className="fas fa-paper-plane ml-2"></i>
                </button>
              </div>
            </div>
          )}
          
          {formStep === 3 && (
            <div className="form-step-content step-3">
              <div className="success-animation">
                <div className="checkmark-circle">
                  <div className="checkmark draw"></div>
                </div>
              </div>
              
              <h3 className="success-title">Request Submitted Successfully!</h3>
              <p className="success-message">
                Your RFC Exemption Request has been submitted successfully. You will receive a confirmation email shortly.
              </p>
              <p className="reference-number">
                Reference Number: <strong>RFC-{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}</strong>
              </p>
              
              <div className="form-actions centered">
                <button type="button" className="btn btn-primary" onClick={closeRFCForm}>
                  Close
                  <i className="fas fa-times-circle ml-2"></i>
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default RFCExemptionForm; 