import {
    generateRandomNumber,
    getRandomAddress,
    getDaysInFormatedString,
    shouldBevisibleByWait,
    waitForInterceptResponse,
    waitForAnElementToContainTextAndClick,
    shouldBeVisibleByWaitAndRetries,
    waitForanElementAndClick,
    waitForAnElementAndType,
    shouldContainTextByWait,
    waitForAnElementToContainTextAndType,
    waitExplicitly,
    checkButtonIsClickable,
  } from '../../../../support/utils/helper';
  
  import { getFormattedDate } from '../../../../support/utils/helper';
  import * as constant_helper from '../../../../support/utils/constants';
  import * as commandCenterLocatrs from '../../../../support/locators/CommandCenter/commandCenter-pages-locators';
  
  const generateRandomCustomerId = () => `customer-${generateRandomNumber()}`;
  const generateRandomOperationCenter = () => `operation-center-${generateRandomNumber()}`;
  
  export const checkIfDateExist = () => {
    commandCenterLocatrs
      .getDateSelector()
      .parent()
      .find('input')
      .invoke('val')
      .then((displayedDate) => {
        const extractedDate = String(displayedDate).split(' ')[0];
        expect(extractedDate.trim()).to.equal(getFormattedDate());
      });
  };
  export const getButton = (locator: string, action: string) => {
    return cy.contains(locator, action);
  };
  export const verifiyClientName = () => cy.get('.v-select__selections .entity-attribute-cell');
  /**
   * The function `getDropdownValue` goes through a dropdown list of elements and selects
   * the one that matches the given parameter.
   * @param {string} exceptionType - The `exceptionType` parameter is a string that represents the
   * parameter being searched for.
   */
  export const getDropdownValue = (value: string) => {
    waitForAnElementToContainTextAndClick(commandCenterLocatrs.getCreateButton(), 'Create').then(
      () => {
        commandCenterLocatrs.getDropdownValues().each(($el) => {
          const option = $el.text().trim();
          if (option === value) {
            cy.wrap($el).click();
          }
        });
      }
    );
  };
  
  /**
   * The function `createDisptach` creates a dispatch task with the given value and text.
   * @param {string} text - The text to be entered in the task instructions text area
   * @returns {void}
   * @description This function creates a dispatch task with the given value and text.
   * / */
  export const getTaskNameInputValue = (taskName: string) => {
    waitForAnElementAndType(commandCenterLocatrs.getInputField(), taskName);
  };
  
  /**
   * The function `verifyListItem` verifies the title and subtitle count of a list item.
   * @param title
   * @param subtitleCount
   */
  export const verifyListItem = (title: string, subtitleCount: number) => {
    commandCenterLocatrs
      .getListItemSelector()
      .should('be.visible')
      .within(() => {
        shouldContainTextByWait(commandCenterLocatrs.getListItemTitle(), title);
        commandCenterLocatrs.verifyListItemSubtitle().should('have.length', subtitleCount);
      });
  };
  
  export const getLocationTile = () =>
    commandCenterLocatrs
      .getLocationTileSelector()
      .scrollIntoView()
      .should('be.visible')
      .and('exist')
      .within(() => {
        commandCenterLocatrs.getLocationTileSelector1().should('be.visible').and('exist');
      });
  
  /**
   * The function `getLocationSection` verifies the location section of the dispatch task.
   * @returns {void}
   * @description This function verifies the location section of the dispatch task.
   * / */
  export const getMapInput = (text: string) =>
    commandCenterLocatrs
      .getButton() // Map button
      .should('be.visible')
      .then(() => {
        commandCenterLocatrs.getPencilIcon().should('be.visible').and('not.be.disabled');
        shouldContainTextByWait(commandCenterLocatrs.getLocationText(), text);
      });
  
  /**
   * The function `getLocationSection` verifies the location section of the dispatch task.
   * @returns {void}
   * @description This function verifies the location section of the dispatch task.
   * / */
  export const getLocationSection = () => {
    getLocationTile();
    commandCenterLocatrs.getLocationIcon().should('be.visible').and('exist');
    verifyListItem('Huel Group', 3);
    commandCenterLocatrs
      .getMapView()
      .should('be.visible')
      .and('have.attr', 'data-tt', 'map-base-view');
    getMapInput('Change location');
  };
  
  /**
   * The function `selectDropwnOption` selects an option from a dropdown list.
   * @param dropdownSelector
   * @param optionText
   */
  export const selectDropwnOption = (dropdownSelector: string, optionText: string) => {
    cy.get(dropdownSelector).click({ force: true });
    cy.get(dropdownSelector).type(`${optionText}{enter}{enter}`);
    waitExplicitly(constant_helper.LONG_WAIT_TIME);
    commandCenterLocatrs
      .clickOnDropdownValue()
      .should('be.visible')
      .contains(optionText)
      .click({ force: true });
  };
  
  export const getAllDropdowns = () => {
    cy.waitForIntercept(commandCenterLocatrs.apiEndpoints.taskType, 'taskType', 'GET');
    selectDropwnOption(commandCenterLocatrs.dropdownSelector.taskType, 'Premise Check');
    waitForInterceptResponse('taskType', 200);
    selectDropwnOption(commandCenterLocatrs.dropdownSelector.client, 'Huel Group');
    selectDropwnOption(commandCenterLocatrs.dropdownSelector.priceTier, 'Tier 1');
  };
  
  /**
   *  The function `filltextInctruction` fills the task instructions text area with the given text.
   * @param {string} text - The text to be entered in the task instructions text area
   * @returns {void}
   * */
  export const filltextInctruction = (text: string) => {
    commandCenterLocatrs
      .getTaskInstructionsText()
      .contains(constant_helper.taskInstructions)
      .parent()
      .find('textarea')
      .type(text);
  };
  
  export const radioButtonsStatus = () =>
    commandCenterLocatrs
      .radioButtonsStatusSelector()
      .parent()
      .find('input')
      .each(($radio, index) => {
        if (index === 0) {
          cy.wrap($radio)
            .should('have.attr', 'aria-checked', 'true')
            .and('have.attr', 'value', 'NOW');
        } else {
          cy.wrap($radio)
            .should('have.attr', 'aria-checked', 'false')
            .and('have.attr', 'value', 'LATER');
        }
      });
  
  /**
   * The function `getPiorityValue` selects the priority value from the dropdown list.
   * @param text
   */
  export const getPiorityValue = (text: string) => {
    commandCenterLocatrs.getPiority().contains('Priority').parent().find('input');
  };
  
  export const getCustomID = () => {
    const customerId = generateRandomCustomerId();
    waitForAnElementAndType(commandCenterLocatrs.getCustomIDSelector(), customerId).then(() => {
      cy.wrap(customerId).as('savedCustomerId');
    });
  };
  
  export const verifiyCustomId = () => {
    cy.get('@savedCustomerId').then((savedCustomerId) => {
      commandCenterLocatrs
        .getCustomIDSelector()
        .contains(constant_helper.Custom_ID_of_the_event)
        .parent()
        .find('input')
        .should('have.value', savedCustomerId);
    });
  };
  
  //**
  /* The function `addPlanned_Duration_In_Minutes` adds the planned duration in minutes to the dispatch task.
  //* @param text 
  //*/
  export const addPlanned_Duration_In_Minutes = (text: string) => {
    waitForAnElementAndType(commandCenterLocatrs.verifiyPlanned_Duration_In_Minutes(), text);
  };
  export const verifiyPlanned_Duration_In_MinutesValue = () => {
    commandCenterLocatrs
      .verifiyPlanned_Duration_In_Minutes()
      .parent()
      .find('input', { timeout: 12000 })
      .should('have.value', '60');
  };
  
  export const getNextButton = () => {
    waitForAnElementToContainTextAndClick(commandCenterLocatrs.getButton(), 'Next');
  };
  /**
   * The function `getReportInputs` fills the report input field with the given text.
   * @param text
   */
  
  export const getReportInputs = (text: string) => {
    commandCenterLocatrs.getReportTab().contains('Report').should('be.visible').and('exist');
    getNextButton();
    waitForAnElementToContainTextAndType(
      commandCenterLocatrs.getReportInputValue(),
      constant_helper.Premise_Name,
      text
    );
  };
  
  export const getsButtons = () => {
    commandCenterLocatrs
      .getCancelbtn()
      .contains('Cancel', { timeout: 12000 })
      .should('be.visible')
      .and('not.be.disabled')
      .then(() => {
        waitForAnElementToContainTextAndClick(commandCenterLocatrs.getButton(), 'Save');
        // commandCenterLocatrs
        //   .getButton()
        //   .contains('Save', { timeout: 12000 })
        //   .should('be.visible')
        //   .and('not.be.disabled')
        //   .click();
      });
  };
  
  export const navigateToTable = () => {
    getNavBarElements();
    commandCenterLocatrs.getTableView();
    commandCenterLocatrs.getWindowView();
    shouldBeVisibleByWaitAndRetries(commandCenterLocatrs.getTableHeader());
  };
  
  /** * The function `createDisptach` creates a dispatch task with the given value and text.
   *@param {string} value - The value of the task type dropdown
   *@param {string} text - The text to be entered in the task instructions text area
   * @returns {void}
   * @description This function creates a dispatch task with the given value and text.
   */
  export const createDisptach = (value: string, text: string) => {
    navigateToTable();
    getDropdownValue(value);
    commandCenterLocatrs.getTaskLabelName().should('be.visible');
    getAllDropdowns();
    getLocationSection();
    filltextInctruction(text);
    commandCenterLocatrs.getDispatchTimings().contains('Dispatch timing').should('be.visible');
    commandCenterLocatrs
      .radioButtons()
      .should('have.length', 2)
      .then(() => {
        radioButtonsStatus();
        getPiorityValue(value);
        getCustomID();
        verifiyCustomId();
        addPlanned_Duration_In_Minutes('60');
        verifiyPlanned_Duration_In_MinutesValue();
        getReportInputs('Premise Check Test');
        cy.waitForIntercept(commandCenterLocatrs.apiEndpoints.dispatchTasks, 'dispatchTasks', 'POST');
        getsButtons();
        waitForInterceptResponse('dispatchTasks', 201);
        commandCenterLocatrs
          .getActiveDeplpymentTitle()
          .contains('Active deployment')
          .should('be.visible')
          .and('exist');
        waitExplicitly(constant_helper.MEDIUM_WAIT_TIME);
        shouldContainTextByWait(commandCenterLocatrs.verifyIfTaskIsCreated(), 'a few seconds');
        // shouldBevisibleByWait(commandCenterLocatrs.verifyIfTaskIsCreated())
        //   .contains('a few seconds')
        //   .should('be.visible');
      });
  };
  
  /**
   * The function `EditAnActivDispatch` edits an active dispatch task with the given task instructions.
   * @param {string} taskInstructions - The `taskInstructions` parameter is a string that represents the
   * task instructions to be entered.
   * @returns {void}
   * @description This function edits an active dispatch task with the given task instructions.
   * /
   *  */
  export const EditAnActivDispatch = (taskInstructions: string) => {
    navigateToTable();
    commandCenterLocatrs
      .getTableView()
      .eq(1)
      .should('be.visible')
      .within(() => {
        waitForanElementAndClick(commandCenterLocatrs.clickOnTheTask().eq(0));
        // commandCenterLocatrs.clickOnTheTask().eq(0).should('exist').click();
      });
    shouldContainTextByWait(commandCenterLocatrs.getDispatchTaskDrawer(), 'Dispatch Task');
    // shouldBevisibleByWait(commandCenterLocatrs.getDispatchTaskDrawer())
    //   .should('be.visible')
    //   .and('exist')
    //   .contains('Dispatch Task');
  
    waitForAnElementToContainTextAndClick(commandCenterLocatrs.getEditButton(), 'Edit')
      // .contains('Edit', { timeout: 1200 })
      // .should('be.visible')
      // .and('exist')
      // .click()
      .then(() => {
        commandCenterLocatrs;
        shouldContainTextByWait(commandCenterLocatrs.getEditTitle(), 'Edit Task/Job');
        // .getEditTitle()
        // .contains('Edit Task/Job')
        // .should('be.visible')
        // .and('exist');
        checkIfDateExist;
        shouldContainTextByWait(commandCenterLocatrs.getTaskType(), 'Premise Check')
          // commandCenterLocatrs
          //   .getTaskType()
          //   .should('be.visible')
          //   .and('exist')
          //   .contains('Premise Check')
          .then(() => {
            shouldContainTextByWait(commandCenterLocatrs.getClient(), 'Huel Group')
              // commandCenterLocatrs
              //   .getClient()
              //   .should('be.visible')
              //   .and('exist')
              //   .contains('Huel Group')
              .then(() => {
                commandCenterLocatrs
                  .getTaskInstructionsText()
                  .contains(constant_helper.taskInstructions);
                commandCenterLocatrs
                  .getPiority()
                  .contains('Priority')
                  .parent()
                  .find('input')
                  .should('have.value', 'Low');
                getPiorityValue('Low');
                waitForAnElementToContainTextAndType(
                  commandCenterLocatrs.verifiyReminder_in_minutes(),
                  'Reminder (in minutes)',
                  '30'
                )
                  // commandCenterLocatrs
                  //   .verifiyReminder_in_minutes()
                  //   .parent()
                  //   .find('input')
                  //   .type('30')
                  .then(() => {
                    commandCenterLocatrs.verifiyBilling().should('be.visible').contains('Tier 1');
                    waitExplicitly(constant_helper.WAIT_TIME);
                    commandCenterLocatrs.verifiyAlarmOrganization().should('be.visible');
                    verifiyPlanned_Duration_In_MinutesValue();
                    getsButtons();
                    shouldContainTextByWait(
                      commandCenterLocatrs.getActiveDeplpymentTitle(),
                      'Active deployment'
                    );
                    // commandCenterLocatrs
                    //   .getActiveDeplpymentTitle()
                    //   .contains('Active deployment')
                    //   .should('be.visible')
                    //   .and('exist');
                  });
              });
          });
      });
  };
  
  export const closeActiveDispatch = () => {
    navigateToTable();
    commandCenterLocatrs
      .getTableView()
      .eq(1)
      .should('be.visible')
      .and('exist')
      .within(() => {
        commandCenterLocatrs.clickOnTheTask().eq(0).should('exist').click();
      });
  
    shouldContainTextByWait(commandCenterLocatrs.getDispatchTaskDrawer(), 'Dispatch Task');
    // shouldBevisibleByWait(commandCenterLocatrs.getDispatchTaskDrawer())
    //   .should('be.visible')
    //   .and('exist')
    //   .contains('Dispatch Task');
    shouldBevisibleByWait(commandCenterLocatrs.getCloseDispatchTaskBtn())
      .should('exist')
      .click()
      .then(() => {
        shouldContainTextByWait(commandCenterLocatrs.getCloseTitle(), 'Close Dispatch Task')
          // commandCenterLocatrs
          //   .getCloseTitle()
          //   .contains('Close Dispatch Task')
          //   .should('be.visible')
          //   .and('exist')
          .then(() => {
            getsButtons();
            commandCenterLocatrs.getCloseDispatchTaskBtn().then(() => {
              shouldContainTextByWait(
                commandCenterLocatrs.verifiyToasMsg(),
                'The operation was successful'
              );
            });
          });
      });
  };
  
  // **
  // * The function `getActiveDeplpymentTitle` verifies the active deployment title.
  // * @returns {void}
  // * @description This function verifies the active deployment title.
  // */
  export const getAllAlertsDropdowns = () => {
    selectDropwnOption(
      commandCenterLocatrs.dropdownSelector.alarmOrganization,
      'Sanford Security Systems'
    );
    commandCenterLocatrs
      .getAlarmtype()
      .click()
      .then(() => {
        waitForAnElementToContainTextAndClick(commandCenterLocatrs.getAlarmTypeDropdown(), 'UAD');
        //commandCenterLocatrs.getAlarmTypeDropdown().contains('UAD').click({ force: true });
        commandCenterLocatrs
          .getConnectionIdentifier()
          .dblclick()
          .then(() => {
            waitForAnElementToContainTextAndClick(commandCenterLocatrs.getAlarmTypeDropdown(), 'HG');
            //commandCenterLocatrs.getAlarmTypeDropdown().contains('HG').click({ force: true });
          });
      });
  };
  
  export const filltextInctructions = () => {
    waitForAnElementToContainTextAndType(
      commandCenterLocatrs.getTaskInstructionsText(),
      constant_helper.getOnSiteInformation_Instructions,
      constant_helper.instructionsText
    )
      // commandCenterLocatrs
      //   .getTaskInstructionsText()
      //   .should('exist')
      //   .contains(constant_helper.getOnSiteInformation_Instructions)
      //   .parent()
      //   .find('textarea')
      //   .clear()
      //   .type(constant_helper.instructionsText, { force: true })
      .then(() => {
        waitForAnElementAndType(
          commandCenterLocatrs.getTaskInstructionsText().eq(1),
          constant_helper.value
        );
        // commandCenterLocatrs
        //   .getTaskInstructionsText()
        //   .parent()
        //   .find('input')
        //   .type(constant_helper.value);
      });
  };
  
  export const verifiyFilltextInctructions = () => {
    commandCenterLocatrs
      .getTaskInstructionsText()
      .should('exist')
      .contains(constant_helper.getOnSiteInformation_Instructions)
      .parent()
      .find('textarea')
      .should('exist')
      .should('include.value', constant_helper.instructionsText.trim());
  };
  
  export const getServiceLevelAgreement = () => {
    commandCenterLocatrs
      .getTaskInstructionsText()
      .parent()
      .find('input')
      .should('have.value', constant_helper.value);
  };
  
  // **
  // * The function `getExtraInformation` gets the extra information text area.
  // * @returns {void}
  // */
  export const getExtraInformation = (key: string, value: string) => {
    commandCenterLocatrs
      .getButtonExtraInformationSelector() //Click on the Extra Information + button
      .click();
    commandCenterLocatrs
      .getInfoRespond()
      .contains(
        "Extra information as a JSON object, example: <br> `{'propertyA': 'valueA', 'propertyB': 'valueB', ...}`."
      );
    commandCenterLocatrs
      .getAdditionalPropertyInput()
      .last()
      .within(() => {
        commandCenterLocatrs.getInputField().first().type(key);
        commandCenterLocatrs.getInputField().last().type(value);
      });
    commandCenterLocatrs
      .getAdditionalPropertyInput()
      .last()
      .within(() => {
        commandCenterLocatrs.getInputField().first().should('have.value', key);
        commandCenterLocatrs.getInputField().last().should('have.value', value);
      });
  };
  
  export const verifiyExtraInformationInputs = () => {
    commandCenterLocatrs.getExtraInformationSelector().each(($el) => {
      cy.wrap($el).within(() => {
        commandCenterLocatrs
          .getInputField()
          .first()
          .should('have.value', constant_helper.addProperty);
        commandCenterLocatrs.getInputField().last().should('have.value', constant_helper.addValue);
      });
    });
  };
  
  /**
   * The function `getSensitiveInformation` gets the sensitive information text area.
   * @returns {void}
   * / */
  export const getSensitiveInformation = (text: string, value: string) => {
    commandCenterLocatrs
      .getInformationSelector()
      .contains(' Sensitive information ')
      .closest('.row')
      .should('exist')
      .find('button[type="button"]')
      .click();
    commandCenterLocatrs
      .getInfoRespond()
      .contains(
        "Sensitive information will be removed when the alarm is not longer `ACTIVE`, example: <br> `{'accessCode': '#12356', ...}`."
      );
  
    commandCenterLocatrs
      .getAdditionalPropertyInput()
      .last()
      .within(() => {
        commandCenterLocatrs.getInputField().first().should('be.visible').type(text, { force: true });
        commandCenterLocatrs.getInputField().last().should('be.visible').type(value, { force: true });
      });
    commandCenterLocatrs
      .getAdditionalPropertyInput()
      .last()
      .within(() => {
        commandCenterLocatrs.getInputField().first().should('be.visible').should('have.value', text);
        commandCenterLocatrs.getInputField().last().should('be.visible').should('have.value', value);
      });
    commandCenterLocatrs.getRemoveItemButton().should('be.visible').and('not.be.disabled');
  };
  
  /**
   * The function `verifiySensitiveInformationInputs` verifies the sensitive information text area.
   * @returns {void}
   */
  export const verifiySensitiveInformationInputs = () => {
    commandCenterLocatrs
      .getOnSiteInformation_InstructionsKeyValue()
      .should('exist')
      .each(($el) => {
        cy.wrap($el).within(() => {
          commandCenterLocatrs.getInputField().should('have.value', constant_helper.addKey);
          commandCenterLocatrs.getInputField().last().should('have.value', constant_helper.addValue1);
        });
      });
  };
  
  export const getAttachments = () => {
    commandCenterLocatrs
      .getInformationSelector()
      .contains(' Attachments ')
      .closest('.row')
      .find('button[type="button"]')
      .click();
    commandCenterLocatrs.getIconAttachment().should('be.visible');
    cy.waitForIntercept(commandCenterLocatrs.apiEndpoints.attachment, 'attachment', 'POST');
    commandCenterLocatrs.getAttachmentsSelector().contains('Select File');
    commandCenterLocatrs.getAttachment().attachFile('images/tracktik.jpeg').invoke('show');
    waitForInterceptResponse('attachment', 200);
  };
  
  // **
  // * The function `getNotes` gets the notes text area.
  // * @returns {void}
  // */
  export const getNotes = (text: string) => {
    commandCenterLocatrs
      .getInformationSelector()
      .contains(' Notes ')
      .closest('.row')
      .find('button[type="button"]')
      .click();
    waitForAnElementAndType(commandCenterLocatrs.getNotesInputSelector(), text);
    // commandCenterLocatrs.getNotesInputSelector().type(text);
    commandCenterLocatrs
      .getRemoveItemButton()
      .should('be.visible')
      .and('not.be.disabled', { timeout: 10000 });
  };
  
  /**
   * The function `verifyListItem` verifies the title and subtitle count of a list item.
   * @param title
   * @param subtitleCount
   */
  export const verifyLocationItems = (title: string, subtitleCount: number) => {
    shouldBevisibleByWait(commandCenterLocatrs.getListAlertsItems())
      .should('be.visible')
      .within(() => {
        commandCenterLocatrs.getListItemTitle().should('be.visible').contains(title);
        commandCenterLocatrs.verifyListItemSubtitle().should('have.length', subtitleCount);
        commandCenterLocatrs
          .getMapViewSelector()
          .should('be.visible')
          .and('have.attr', 'data-tt', 'map-coordinate-selector')
          .and('exist');
      });
  };
  //**
  // * The function `verifyIfTaskIsCreated` the buttons are visible.
  //* @returns {void}
  // */
  export const verifyIfButtonsAreVisible = () => {
    shouldContainTextByWait(commandCenterLocatrs.getCancelbtn(), 'Cancel');
    // commandCenterLocatrs
    //   .getCancelbtn()
    //   .contains('Cancel', { timeout: 12000 })
    //   .should('be.visible')
    //   .and('not.be.disabled');
    commandCenterLocatrs;
    shouldContainTextByWait(commandCenterLocatrs.getButton(), 'Save');
    // .getButton()
    // .contains('Save', { timeout: 12000 })
    // .should('be.visible')
    // .and('not.be.disabled');
  };
  // **
  // * The function `getActiveDeplpymentTitle` verifies the active deployment title.
  // * @returns {void}
  // * @description This function verifies the active deployment title.
  // */
  export const getSelectorTitle = (title: string, subtitleCount: number) => {
    shouldContainTextByWait(commandCenterLocatrs.getDispatchTaskDrawer(), 'Alarm');
    // commandCenterLocatrs.getDispatchTaskDrawer().should('be.visible').and('exist').contains('Alarm');
    commandCenterLocatrs.getAlarmText().should('have.length', subtitleCount);
  };
  
  export const getAlertDetails = () => {
    const labels = [
      'Alarm identifier',
      'Connection Identifier',
      'Alarm Type Code',
      'Triggered Date Time in UTC',
      'Registered Date Time in UTC',
      'Alarm Connection',
      'Dispatch Task',
      'Alarm Organization',
      'Location',
      'Notes',
    ];
  
    const values = [
      'HG',
      'UAD',
      getFormattedDate(),
      getFormattedDate(),
      'Sanford Security Systems',
      '1 Notes',
    ];
  
    commandCenterLocatrs
      .getLabelsRows()
      .should('exist')
      .invoke('text')
      .then((text) => {
        labels.forEach((label) => {
          expect(text).to.include(label);
        });
        values.forEach((value) => {
          commandCenterLocatrs.getCell().should('contain', value);
        });
        commandCenterLocatrs
          .getGooleMapLink()
          .should('have.attr', 'href')
          .and('include', 'https://www.google.com/maps');
      });
  };
  
  export const getNavBarElements = () => {
    checkButtonIsClickable('Command Center');
    // cy.contains('span', 'Command Center').should('be.visible').and('exist');
    commandCenterLocatrs.getTTLogo().should('be.visible').and('exist');
    commandCenterLocatrs.getMainDashboardTitle().should('be.visible').contains('Call to action');
    commandCenterLocatrs.getMainDashboardTitle().should('be.visible').contains('Active deployment');
  };
  
  // **
  // * The function `createAnAlert` creates an alert with the given value.
  // * @param {string} value - The value of the alert dropdown
  // * @returns {void}
  // * @description This function creates an alert with the given value.
  // */
  export const createAnAlert = (value: string) => {
    navigateToTable();
    getDropdownValue(value);
    shouldContainTextByWait(commandCenterLocatrs.getAlertTitle(), 'Register an alarm')
      // commandCenterLocatrs
      //   .getAlertTitle()
      //   .should('be.visible')
      //   .contains('Register an alarm')
      .then(() => {
        getAllAlertsDropdowns();
        verifyLocationItems('Huel Group', 2);
        commandCenterLocatrs
          .radioButtons()
          .should('have.length', 2)
          .then(() => {
            radioButtonsStatus();
            waitForAnElementToContainTextAndClick(
              commandCenterLocatrs.getOnSiteInformation(),
              'On site information'
            );
            //commandCenterLocatrs.getOnSiteInformation().contains('On site information').click();
            waitExplicitly(constant_helper.WAIT_TIME);
            filltextInctructions();
            verifiyFilltextInctructions();
            getExtraInformation(constant_helper.addProperty, constant_helper.addValue);
            verifiyExtraInformationInputs();
            getSensitiveInformation(constant_helper.addKey, constant_helper.addValue1);
            verifiySensitiveInformationInputs();
            getAttachments();
            getNotes('Testing Notes');
            shouldBevisibleByWait(commandCenterLocatrs.getGreenCircle())
              .should('be.visible')
              .and('exist');
            cy.waitForIntercept(commandCenterLocatrs.apiEndpoints.alarms, 'alarms', 'POST');
            waitExplicitly(constant_helper.WAIT_TIME);
            getsButtons();
            waitForInterceptResponse('alarms', 201);
            commandCenterLocatrs.getActiveDeplpymentTitle();
            waitExplicitly(constant_helper.MEDIUM_WAIT_TIME);
            shouldContainTextByWait(commandCenterLocatrs.verifyIfTaskIsCreated(), 'a few seconds');
            // shouldBevisibleByWait(commandCenterLocatrs.verifyIfTaskIsCreated())
            //   .contains('a few seconds')
            //   .should('be.visible')
            //   .and('exist');
          });
      });
  };
  
  //**
  // * The function `EditAnActivAlert` edits an active alert with the given task instructions.
  // * @param {string} taskInstructions - The `taskInstructions` parameter is a string that represents the
  // * task instructions to be entered.
  // * @returns {void}
  // * @description This function edits an active alert with the given task instructions.
  // */
  export const EditAnActivAlert = () => {
    navigateToTable();
    shouldBevisibleByWait(commandCenterLocatrs.clickOnTheAlert())
      .first()
      .click()
      .then(() => {
        getSelectorTitle('Alarm', 1);
        getAlertDetails();
        waitForAnElementToContainTextAndClick(commandCenterLocatrs.getEditButtonAlert().eq(0), 'Edit')
          // commandCenterLocatrs
          //   .getEditButtonAlert()
          //   .eq(0)
          //   .contains('Edit')
          //   .should('be.visible')
          //   .and('exist')
          //   .click()
          .then(() => {
            shouldContainTextByWait(commandCenterLocatrs.getEditAlertTitle(), 'Edit Alarm')
              // commandCenterLocatrs
              //   .getEditAlertTitle()
              //   .contains('Edit Alarm')
              //   .should('be.visible')
              //   .and('exist')
              .then(() => {
                getServiceLevelAgreement();
                verifiyExtraInformationInputs();
                shouldBevisibleByWait(commandCenterLocatrs.getGreenCircle())
                  .should('be.visible')
                  .and('exist');
                getsButtons();
                shouldContainTextByWait(
                  commandCenterLocatrs.verifiyToasMsg(),
                  'The operation was successful'
                );
                // commandCenterLocatrs.verifiyToasMsg().contains('The operation was successful');
              });
          });
      });
  };
  
  //**
  // * The function `closeAnAlert` closes an active alert.
  // * @returns {void}
  // * @description This function closes an active alert.
  // */
  export const closeAnAlert = () => {
    navigateToTable();
    waitForanElementAndClick(commandCenterLocatrs.clickOnTheAlert().first())
      // commandCenterLocatrs
      //   .clickOnTheAlert()
      //   .first()
      //   .click()
      .then(() => {
        getSelectorTitle('Alarm', 1);
        waitForAnElementToContainTextAndClick(commandCenterLocatrs.getButton(), 'Cancel')
          // commandCenterLocatrs
          //   .getButton()
          //   .contains('Cancel')
          //   .should('be.visible')
          //   .and('not.be.disabled')
          //   .click({ force: true })
          .then(() => {
            commandCenterLocatrs.getDispatchTaskDrawer().should('exist').and('be.visible');
            getsButtons();
            commandCenterLocatrs
              .getCloseDispatchTaskBtn()
              .should('not.exist')
              .then(() => {
                waitExplicitly(constant_helper.LONG_WAIT_TIME);
                shouldBevisibleByWait(commandCenterLocatrs.getCancelLabel())
                  .should('be.visible')
                  .and('exist');
              });
          });
      });
  };
  
  // **
  // * The function `getSearchInput` gets the search input field.
  // * @param {string} text - The text to be entered in the search input field
  // * @returns {void}
  // */
  export const getSearchInput = (text: string) =>
    commandCenterLocatrs.getSearchInputSelector().should('be.visible').and('exist');
  // **
  //*  The function `getIteamUserCout` gets the user item count.
  //* @param {string} itemsCount - The `itemsCount` parameter is a string that represents the
  //* @description This function gets the user item count.
  // */
  export const getIteamUserCout = (itemsCount: string) => {
    commandCenterLocatrs
      .getUserItemCount()
      .contains(itemsCount, { timeout: 12000 })
      .should('be.visible')
      .and('exist');
  };
  
  // **
  // * The function `verifyIfNameMatches` verifies if the name matches the user name in the table.
  // * @param {string} NameOfTheUser - The `NameOfTheUser` parameter is a string that represents the
  // * user name to be searched for.
  // * @description This function verifies the user name in the table.
  // */
  export const verifyIfNameMatches = (nameOfTheUser: string) => {
    waitForAnElementToContainTextAndClick(commandCenterLocatrs.getSelectBtnSelector(), 'Select');
    // commandCenterLocatrs
    //   .getSelectBtnSelector()
    //   .contains('Select')
    //   .should('be.visible')
    //   .and('exist')
    //   .click();
    cy.waitForIntercept(commandCenterLocatrs.apiEndpoints.getUser, 'getUser', 'GET');
    commandCenterLocatrs.getUserHeaderH3().should('be.visible').and('exist');
    commandCenterLocatrs.getNameOfUser().should('contain', nameOfTheUser);
    waitForInterceptResponse('getUser', 200);
  };
  
  export const getToggelBtnSelector = () => {
    commandCenterLocatrs.getNofifyUserSelector().then(() => {
      commandCenterLocatrs
        .getNotifyToggleSelector()
        .should('exist')
        .and('be.visible')
        .dblclick()
        .then(() => {
          commandCenterLocatrs.getNotifyLabelSelector().contains('Notify user');
        });
    });
  };
  
  // **
  // * The function `verifyUserNameInTheTable` verifies the user name in the table.
  // * @param {string} userName - The `userName` parameter is a string that represents the
  // * user name to be searched for.
  // * @description This function verifies the user name in the table.
  // */
  export const verifyUserNameInTheTable = (userName: string) => {
    commandCenterLocatrs.getTableRowSelector().each((row) => {
      cy.wrap(row)
        .find('div.text-truncate')
        .invoke('text')
        .then((text) => {
          if (text.trim().includes(userName)) {
            cy.log('User name is found');
            expect(text.trim()).to.include(userName);
          }
        });
    });
  };
  
  // **
  // * The function `getAssignUserToDispatchTask` assigns a user to a dispatch task.
  // * @param {string} searchUser - The `searchUser` parameter is a string that represents the
  // * user to be searched for.
  // * @param {string} selector - The `selector` parameter is a string that represents the
  // * element to be searched for.
  // * @returns {void}
  // */
  export const getAssignUserToDispatchTask = (
    searchUserName: string,
    nameOfTheUser: string,
    role: string
  ) => {
    navigateToTable();
    commandCenterLocatrs
      .getTableView()
      .eq(1)
      .should('be.visible')
      .and('exist')
      .within(() => {
        waitForanElementAndClick(commandCenterLocatrs.clickOnTheTask().eq(0));
        // commandCenterLocatrs.clickOnTheTask().eq(0).should('exist').click();
      });
    shouldContainTextByWait(commandCenterLocatrs.getDispatchTaskDrawer(), 'Dispatch Task');
    // shouldBevisibleByWait(commandCenterLocatrs.getDispatchTaskDrawer())
    //   .should('be.visible')
    //   .and('exist')
    //   .contains('Dispatch Task');
    getButton('span', 'Assign Dispatch Task to User or Group')
      .should('be.visible', { timeout: 1200 })
      .click()
      .then(() => {
        shouldContainTextByWait(
          commandCenterLocatrs.getDispatchTaskDrawer(),
          'Assign Dispatch Task to User or Group'
        );
        // commandCenterLocatrs
        //   .getDispatchTaskDrawer()
        //   .contains('Assign Dispatch Task to User or Group', { timeout: 32000 })
        //   .should('be.visible');
        waitForAnElementToContainTextAndClick(
          commandCenterLocatrs.getEmployeenTabSelector(),
          'Employees'
        );
        // shouldBevisibleByWait(commandCenterLocatrs.getEmployeenTabSelector())
        //   .contains('Employees')
        //   .should('be.visible')
        //   .click({ force: true });
        commandCenterLocatrs
          .getToolbarContent()
          .should('be.visible')
          .and('exist')
          .then(() => {
            getSearchInput(searchUserName).eq(3).type(nameOfTheUser, { force: true });
          });
        const expectedDataOfTheUser = [
          { title: nameOfTheUser, selector: commandCenterLocatrs.getListItemTitleSelector.name },
          { title: role, selector: commandCenterLocatrs.getListItemTitleSelector.role },
        ];
        expectedDataOfTheUser.forEach((item) => {
          getIteamUserCout(' 1 Items ');
  
          cy.get(item.selector).contains(item.title).should('be.visible').and('exist');
        });
        verifyIfNameMatches(nameOfTheUser);
        getToggelBtnSelector();
        getsButtons();
        waitForanElementAndClick(commandCenterLocatrs.closeDrawer());
        //commandCenterLocatrs.closeDrawer().click({ force: true }); // Had to force the click because the drawer sometimes was not closing
        verifyUserNameInTheTable(nameOfTheUser);
      });
  };
  
  export const getContainerData = () => {
    commandCenterLocatrs
      .getConatinerSelector()
      .should('exist')
      .then(() => {
        checkButtonIsClickable('Open Dispatch Task');
        // cy.contains('span', 'Open Dispatch Task')
        //   .should('be.visible')
        //   .and('exist')
        //   .and('not.be.disabled')
        //   .and('have.css', 'pointer-events', 'auto');
        checkButtonIsClickable('Assign Dispatch Task to User or Group');
        // cy.contains('span', 'Assign Dispatch Task to User or Group')
        //   .should('be.visible')
        //   .and('exist')
        //   .and('not.be.disabled')
        //   .and('have.css', 'pointer-events', 'auto');
      });
  };
  
  export const getCloseDispatchHeaderSelector = () =>
    commandCenterLocatrs
      .getTableHeaderSelector()
      .should('be.visible')
      .then(($header) => {
        expect($header.text())
          .includes('System ID')
          .includes('Custom ID of the event')
          .includes('Priority')
          .includes('Task Type')
          .includes('Start Date / Time')
          .includes('Client')
          .includes('Workflow Instance - Current Status')
          .includes('Assigned To');
      });
  
  export const getDispatchDetails = () => {
    const labels = [
      'Custom ID of the event',
      'Priority',
      'Reminder (in minutes)',
      'Modified On',
      'Current Status',
      'Location',
      'Client',
      'Location',
      'Task Type',
    ];
    const values = [
      getFormattedDate(),
      'Low',
      getFormattedDate(),
      'Assigned',
      'Huel Group',
      'Bonnie Boyle',
      'Huel Group',
      'Premise Check',
    ];
    shouldContainTextByWait(commandCenterLocatrs.geCollapsibleHeader(), 'Details').then(() => {
      shouldContainTextByWait(
        commandCenterLocatrs.getTaskInstructionsText(),
        constant_helper.taskInstructions
      );
      commandCenterLocatrs
        .getLabelsRows()
        .should('exist')
        .invoke('text')
        .then((text) => {
          labels.forEach((label) => {
            expect(text).to.include(label);
          });
          Object.values(values).forEach((value) => {
            commandCenterLocatrs.getCell().should('contain', value);
          });
        });
    });
    commandCenterLocatrs.getAvailableTransitionsSection().within(() => {
      cy.get('button')
        .invoke('text')
        .then((text) => {
          expect(text)
            .to.include('Refuse')
            .to.include('Accepted: Pending')
            .to.include('On The Way')
            .to.include('Canceled');
        });
    });
  };
  
  //* The function `getDetails` gets the details of the dispatch task.
  //* @param {string} header - The header of the section
  //* @param {string} labels - The labels of the section
  //* @param {string} values - The values of the section
  //* @returns {void}
  export const getDetails = ({ header, labels, values }) => {
    commandCenterLocatrs
      .geCollapsibleHeader()
      .contains(header)
      .scrollIntoView()
      .should('be.visible')
      .and('exist')
      .click();
    commandCenterLocatrs
      .getLabelsRows()
      .should('exist')
      .invoke('text')
      .then((text) => {
        labels.forEach((label) => {
          expect(text).to.include(label);
        });
  
        values.forEach((value) => {
          commandCenterLocatrs.getCell().should('contain', value);
        });
      });
  };
  
  // **
  // * The function `getCloseDispatchTab` closes the dispatch tab.
  // * @param {string} searche - The `searche` parameter is a string that represents the
  // * search to be performed.
  // * @returns {void}
  export const getClosedDispatchTab = (search: string) => {
    getNavBarElements();
    commandCenterLocatrs.navigateToSearchTab().dblclick();
    cy.verifyUrl('/search');
    shouldContainTextByWait(
      commandCenterLocatrs.getSearchTableTitleSelector(),
      'What are you looking for?'
    );
    // shouldBevisibleByWait(commandCenterLocatrs.getSearchTableTitleSelector())
    //   .contains('What are you looking for?')
    //   .should('be.visible')
    // .and('exist');
    shouldContainTextByWait(commandCenterLocatrs.getCloseDispatchTab(), 'Closed dispatch');
    //commandCenterLocatrs.
    // commandCenterLocatrs
    //   .getCloseDispatchTab()
    //   .contains('Closed dispatch')
    //   .should('be.visible')
    //   .and('exist');
    waitForAnElementAndType(commandCenterLocatrs.getSearchInputSelector(), search);
    //commandCenterLocatrs.
    // getSearchInputSelector().should('be.visible').and('exist').type(search, { timeout: 12000 });
    verifyUserNameInTheTable(search);
    getCloseDispatchHeaderSelector()
      .should('be.visible')
      .and('exist')
      .then(() => {
        waitForAnElementToContainTextAndClick(
          commandCenterLocatrs.getTableRowSelector(),
          'customer-'
        );
        //commandCenterLocatrs.getTableRowSelector().contains('customer-').click();
        shouldContainTextByWait(commandCenterLocatrs.getDispatchTaskDrawer(), 'Dispatch Task')
          // shouldBevisibleByWait(getDispatchTaskDrawer())
          //   .should('be.visible')
          //   .and('exist')
          //   .contains('Dispatch Task')
          .then(() => {
            getContainerData();
            getDispatchDetails();
            getDetails(constant_helper.detailsDispatchTask.TaskType);
            getDetails(constant_helper.detailsDispatchTask.priceTier);
            getDetails(constant_helper.detailsDispatchTask.location);
            getDetails(constant_helper.detailsDispatchTask.dateTimeAndDuration);
            getDetails(constant_helper.detailsDispatchTask.moreInformation);
          });
      });
  };
  export const searchForAlert = (search: string) => {
    cy.waitForIntercept(commandCenterLocatrs.apiEndpoints.getAlerts, 'getAlerts', 'GET');
    commandCenterLocatrs
      .getSearchInputSelector()
      .should('be.visible')
      .then((input) => {
        waitForInterceptResponse('getAlerts', 200);
        cy.wrap(input).eq(1).type(search);
        verifyUserNameInTheTable('HG');
      });
  };
  
  export const getAlertsHeaderSelector = () =>
    commandCenterLocatrs
      .getTableHeaderSelector()
      .should('be.visible')
      .then(($header) => {
        expect($header.text())
          .includes('Alarm identifier')
          .includes('Alarm Type Code')
          .includes('Connection Identifier')
          .includes('Alarm Organization')
          .includes('Registered Date Time in UTC')
          .includes('Status');
      });
  
  export const editAlert = () => {
    waitForAnElementToContainTextAndClick(commandCenterLocatrs.getEditButtonAlert().eq(0), 'Edit')
      // commandCenterLocatrs
      //   .getEditButtonAlert()
      //   .eq(0)
      //   .contains('Edit')
      //   .should('be.visible')
      //   .and('exist')
      //   .click()
      .then(() => {
        shouldContainTextByWait(commandCenterLocatrs.getEditAlertTitle(), 'Edit Alarm')
          // commandCenterLocatrs
          //   .getEditAlertTitle()
          //   .contains('Edit Alarm')
          //   .should('be.visible')
          //   .and('exist')
          .then(() => {
            shouldBevisibleByWait(commandCenterLocatrs.getGreenCircle())
              .should('be.visible')
              .and('exist');
            getsButtons();
          });
      });
  };
  
  //**/
  //* The function `addNotes` adds notes to the dispatch task.
  //* @param {string} notes - The `notes` parameter is a string that represents the
  //* notes to be entered.
  // */
  export const addNotes = (notes: string) => {
    shouldBevisibleByWait(cy.contains('span', 'Add Note')).click();
    waitForAnElementToContainTextAndType(
      commandCenterLocatrs.getTaskInstructionsText(),
      'Note *',
      notes
    );
  
    // commandCenterLocatrs
    //   .getTaskInstructionsText()
    //   .contains('Note *')
    //   .parent()
    //   .find('textarea')
    //   .type(notes);
    shouldBevisibleByWait(commandCenterLocatrs.getGreenCircle()).should('be.visible').and('exist');
    getsButtons();
  };
  
  export const cancelAlert = () => {
    cy.waitForIntercept(commandCenterLocatrs.apiEndpoints.getAlerts, 'getAlerts', 'GET');
    waitForInterceptResponse('getAlerts', 200);
    getButton('button', 'Cancel').should('be.visible').and('not.be.disabled').click();
    commandCenterLocatrs.getDispatchTaskDrawer().should('exist').and('be.visible');
    shouldContainTextByWait(commandCenterLocatrs.getCancelbtn(), 'Cancel')
      // commandCenterLocatrs
      //   .getCancelbtn()
      //   .contains('Cancel', { timeout: 12000 })
      //   .should('not.be.disabled')
      .then(() => {
        waitForAnElementToContainTextAndClick(commandCenterLocatrs.getButton(), 'Save');
        // commandCenterLocatrs
        //   .getButton()
        //   .contains('Save', { timeout: 12000 })
        //   .should('not.be.disabled')
        //   .dblclick({ force: true });
        shouldContainTextByWait(
          commandCenterLocatrs.verifiyToasMsg(),
          'The operation was successful'
        );
        // commandCenterLocatrs
        //   .verifiyToasMsg()
        //   .contains('The operation was successful')
        //   .should('be.visible')
        //   .and('have.css', 'color', 'rgba(255, 255, 255, 0.87)');
        shouldBevisibleByWait(commandCenterLocatrs.getCancelLabel())
          .should('be.visible')
          .and('exist');
      });
  };
  
  export const archiveAlert = () => {
    waitExplicitly(constant_helper.MEDIUM_WAIT_TIME);
  
    getButton('span', 'Archive').should('be.visible').and('not.be.disabled').click();
    shouldContainTextByWait(commandCenterLocatrs.getCloseTitle(), 'Archive');
    // shouldBevisibleByWait(
    //   commandCenterLocatrs.getCloseTitle().contains('Archive').should('be.visible').and('exist')
    // );
    getsButtons();
    commandCenterLocatrs
      .getArchiveAlertTitle()
      .should('be.visible')
      .and('exist')
      .and('have.css', 'color', 'rgba(0, 0, 0, 0.87)');
  };
  
  //**  The function `getAlertsTab` gets the alerts tab.
  //* @param {string} search - The `search` parameter is a string that represents the
  //* search to be performed.
  //* @param {string} notes - The `notes` parameter is a string that represents the
  //* notes to be entered.
  // */
  export const getAlertsTab = (search: string, notes: string) => {
    getNavBarElements();
    commandCenterLocatrs.navigateToSearchTab().dblclick();
    cy.url().should('include', '/search');
    shouldContainTextByWait(
      commandCenterLocatrs.getSearchTableTitleSelector(),
      'What are you looking for?'
    );
    // shouldBevisibleByWait(commandCenterLocatrs.getSearchTableTitleSelector())
    //   .contains('What are you looking for?')
    //   .should('be.visible')
    //   .and('exist');
    waitForAnElementToContainTextAndClick(commandCenterLocatrs.getAlarmTab(), 'Alarms');
    //commandCenterLocatrs.getAlarmTab().contains('Alarms').should('be.visible').and('exist').click();
    searchForAlert(search), { timeout: 12000 };
    getAlertsHeaderSelector().should('be.visible').and('exist');
    waitExplicitly(constant_helper.MEDIUM_WAIT_TIME);
    commandCenterLocatrs.getTableRowSelector().contains(getDaysInFormatedString(1, 0));
    waitForAnElementToContainTextAndClick(commandCenterLocatrs.getTableRowSelector(), 'UAD');
    //commandCenterLocatrs.getTableRowSelector().contains('UAD').click();
    shouldContainTextByWait(commandCenterLocatrs.getDispatchTaskDrawer(), 'Alarm');
    // commandCenterLocatrs
    //   .getDispatchTaskDrawer()
    //   .should('be.visible')
    //   .and('exist')
    //   .contains('Alarm');
    // shouldBevisibleByWait(commandCenterLocatrs.getDispatchTaskDrawer())
    //   .should('be.visible')
    //   .and('exist')
    //   .contains('Alarm');
    getAlertDetails();
    editAlert();
    getServiceLevelAgreement();
    addNotes(notes);
    waitForInterceptResponse('getAlerts', 200);
    cancelAlert();
    waitForInterceptResponse('getAlerts', 200);
    archiveAlert();
  };
  
  /**
   * ** The function `getSite` gets the site.
  //* @param {string} IsSite - The `IsSite` parameter is a string that represents the
  //* site to be searched for.
   @param {string} searchSite - The `searchSite` parameter is a string that represents the
  //* site to be searched for.
  //* @param {string} nameOfTheUser - The `nameOfTheUser` parameter is a string that represents the user name.
  //* @param {string} nameOfTheSite - The `nameOfTheSite` parameter is a string that represents the site name.
  //* @param {string} assignUser - The `AssignUser` parameter is a string that represents the user to be assigned.
  //* @param {string} assignToSiteZone - The `AssignToSiteZone` parameter is a string that represents the site zone to be assigned.
  //* @param {string} title - The `title` parameter is a string that represents the title of the site/zone
   */
  export const getSiteZone = (
    isSite: string,
    searchSite: string,
    nameOfTheUser: string,
    nameOfTheSite: string,
    assignUser: string,
    assignToSiteZone: string,
    title: string,
    position_title: string
  ) => {
    commandCenterLocatrs.getAssignmentsLabels().contains('Assignment').should('be.visible');
    commandCenterLocatrs
      .getFormAssignUserField()
      .should('be.visible')
      .and('exist')
      .and('have.css', 'color', 'rgba(0, 0, 0, 0.87)');
    waitForAnElementToContainTextAndClick(commandCenterLocatrs.getButton(), 'Select');
    // waitForanElementAndClick(commandCenterLocatrs.getButton())
    //   .contains('Select')
    //   .should('be.visible')
    //   .click();
    shouldContainTextByWait(
      commandCenterLocatrs.getDispatchTaskDrawer(),
      'Assign Dispatch Task to User or Group'
    );
    // commandCenterLocatrs
    //   .getDispatchTaskDrawer()
    //   .contains('Assign Dispatch Task to User or Group', { timeout: 12000 })
    //   .should('be.visible');
  
    cy.contains(isSite).should('be.visible').and('exist').dblclick();
    commandCenterLocatrs.getToolbarContent().within(() => {
      waitExplicitly(constant_helper.MEDIUM_WAIT_TIME);
      waitForAnElementAndType(commandCenterLocatrs.getSearchInputSelector(), searchSite);
      //shouldBevisibleByWait(commandCenterLocatrs.getSearchInputSelector()).type(searchSite);
      cy.waitForIntercept(commandCenterLocatrs.apiEndpoints.mobileDevices, 'mobileDevices', 'GET');
      waitForInterceptResponse('mobileDevices', 200);
    });
    const expectedDataOfTheUser = [
      { title: nameOfTheUser, selector: commandCenterLocatrs.getListItemTitleSelector.name },
      { title: nameOfTheSite, selector: commandCenterLocatrs.getListItemTitleSelector.role },
    ];
    expectedDataOfTheUser.forEach((item) => {
      cy.get(item.selector).contains(item.title).should('be.visible');
    });
  
    commandCenterLocatrs.getGerneralInformationInput();
    commandCenterLocatrs
      .getColumnSelector()
      .should('exist')
      .then(() => {
        commandCenterLocatrs.getETASelector().contains('ETA');
      });
  
    commandCenterLocatrs
      .getDeviceTileSelector()
      .invoke('text')
      .then((text) => {
        expect(text).to.include(assignUser);
        expect(text).to.include('More actions');
      });
    waitExplicitly(constant_helper.WAIT_TIME); // //Need to added wait because the button sometimes was not getting clicked
    waitForAnElementToContainTextAndClick(commandCenterLocatrs.getButton(), 'More actions');
    // commandCenterLocatrs.getButton().as('target');
    // cy.get('@target').contains('More actions').should('be.visible').click(); //Need to leave this line comment as there is a bug reported and i could not test it
  
    commandCenterLocatrs
      .getContentActiveSelector()
      .should('be.visible')
      .invoke('text')
      .then((text) => {
        expect(text).to.include('Assign to position');
        expect(text).to.include(assignToSiteZone);
        expect(text).to.include('Details');
      });
    waitForAnElementToContainTextAndClick(
      commandCenterLocatrs.getContentActiveSelector(),
      'assignToSiteZone'
    );
    // commandCenterLocatrs  //Need to leave this line comment as there is a bug reported and i could not test it
    //   .getContentActiveSelector()
    //   .contains(assignToSiteZone)
    //   .should('be.visible')
    //   .and('exist')
    //   .click();
    commandCenterLocatrs
      .getFormAssignUserField()
      .should('exist')
      .invoke('text')
      .should('include', title);
  
    commandCenterLocatrs
      .getPositionTitle()
      .should('exist')
      .invoke('text')
      .should('include', position_title);
    getNextButton();
    getReportInputs('Premise Check Test');
    cy.waitForIntercept(commandCenterLocatrs.apiEndpoints.dispatchTasks, 'dispatchTasks', 'POST');
    getsButtons();
    waitForInterceptResponse('dispatchTasks', 201);
    shouldContainTextByWait(commandCenterLocatrs.getActiveDeplpymentTitle(), 'Active deployment');
    // commandCenterLocatrs
    //   .getActiveDeplpymentTitle()
    //   .contains('Active deployment')
    //   .should('be.visible')
    //   .and('exist');
    waitExplicitly(constant_helper.MEDIUM_WAIT_TIME);
    shouldContainTextByWait(commandCenterLocatrs.verifyIfTaskIsCreated(), 'a few seconds');
  };
  
  /*
   * The function `getDropdownValue` gets the dropdown value.
   * @param {string} value - The `value` parameter is a string that represents the value to get from dropdown.
   * @returns {void}
   * @description This function gets the dropdown value.
   * nameOfTheUser - The `nameOfTheUser` parameter is a string that represents the user name.
   * nameOfTheSite - The `nameoOfTheSite` parameter is a string that represents the site name.
   * IsSite - The `IsSite` parameter is a string that represents the site to be searched for.
   * AssignUser - The `AssignUser` parameter is a string that represents the user to be assigned.
   * AssignToSiteZone - The `AssignToSiteZone` parameter is a string that represents the site zone to be assigned.
   * title - The `title` parameter is a string that represents the title of the site/zone
   * position_title - The `position_title` parameter is a string that represents the Site&ZonePosition title.
   */
  export const createDisptachAndAssignToSiteZone = (
    value: string,
    searchSite: string,
    nameOfTheUser: string,
    nameOfTheSite: string,
    isSite: string,
    assignUser: string,
    assignToSiteZone: string,
    title: string,
    position_title: string
  ) => {
    navigateToTable();
    getDropdownValue(value);
    commandCenterLocatrs.getTaskLabelName().should('be.visible');
    getAllDropdowns();
    getSiteZone(
      searchSite,
      nameOfTheUser,
      nameOfTheSite,
      isSite,
      assignUser,
      assignToSiteZone,
      title,
      position_title
    );
    verifyUserNameInTheTable(nameOfTheUser);
  };
  
  /**
   * The function `getVendor` gets the vendor.
   * @param value - The `value` parameter is a string that represents the value to get from dropdown.
   */
  export const createDisptachAndAssignToVendors = (value: string) => {
    navigateToTable();
    getDropdownValue(value);
    commandCenterLocatrs.getTaskLabelName().should('be.visible');
    cy.waitForIntercept(commandCenterLocatrs.apiEndpoints.taskType, 'taskType', 'GET');
    selectDropwnOption(commandCenterLocatrs.dropdownSelector.taskType, 'Home Inspection');
    waitForInterceptResponse('taskType', 200);
    selectDropwnOption(commandCenterLocatrs.dropdownSelector.client, 'QA site');
    commandCenterLocatrs
      .getAssignmentsLabels()
      .contains('Assignment')
      .scrollIntoView()
      .should('be.visible');
    commandCenterLocatrs
      .getFormAssignUserField()
      .should('be.visible')
      .and('exist')
      .and('have.css', 'color', 'rgba(0, 0, 0, 0.87)');
    waitExplicitly(constant_helper.WAIT_TIME);
    waitForAnElementToContainTextAndClick(commandCenterLocatrs.getButton(), 'Select');
    // waitForanElementAndClick(commandCenterLocatrs.getButton())
    //   .contains('Select')
    //   .should('be.visible')
    //   .and('exist')
    //   .click({ force: true });
    waitForAnElementToContainTextAndClick(commandCenterLocatrs.getEmployeenTabSelector(), 'Vendors');
    // shouldBevisibleByWait(commandCenterLocatrs.getEmployeenTabSelector())
    //   .contains('Vendors')
    //   .should('be.visible')
    //   .click();
    commandCenterLocatrs
      .getTaskInstructionsText()
      .should('be.visible')
      .invoke('text')
      .then((text) => {
        expect(text).to.include(constant_helper.getVendorsInput.SearchAnyVendor);
        expect(text).to.include(constant_helper.getVendorsInput.city);
        expect(text).to.include(constant_helper.getVendorsInput.state);
      });
    commandCenterLocatrs
      .getTaskInstructionsText()
      .contains('Search any vendor')
      .parent()
      .within(() => {
        commandCenterLocatrs.getInputField().type('Northern Security');
      });
    commandCenterLocatrs
      .getVendorSelector()
      .should('be.visible')
      .invoke('text')
      .then((text) => {
        const expectedVendors = ['Northern Security', 'Jeremy Greene'];
        expect(expectedVendors.some((vendor) => text.includes(vendor))).to.be.true;
      });
    commandCenterLocatrs
      .getColumnSelector()
      .should('exist')
      .invoke('text')
      .then((text) => {
        const expectedColumns = ['Select', 'Details'];
        expect(expectedColumns.some((column) => text.includes(column))).to.be.true;
      });
    // waitForAnElementToContainTextAndClick(commandCenterLocatrs.getColumnSelector(), 'Select');
    commandCenterLocatrs
      .getColumnSelector()
      .contains('Select')
      .should('be.visible')
      .and('exist')
      .click({ waitForAnimations: false });
    commandCenterLocatrs
      .getFormAssignUserField()
      .should('exist')
      .invoke('text')
      .should('include', 'Vendor');
    commandCenterLocatrs
      .getPositionTitle()
      .should('exist')
      .invoke('text')
      .should('include', 'Northern Security');
    getNextButton();
    cy.waitForIntercept(commandCenterLocatrs.apiEndpoints.dispatchTasks, 'dispatchTasks', 'POST');
    getsButtons();
    waitForInterceptResponse('dispatchTasks', 201);
    shouldContainTextByWait(commandCenterLocatrs.getActiveDeplpymentTitle(), 'Active deployment');
    // commandCenterLocatrs
    //   .getActiveDeplpymentTitle()
    //   .contains('Active deployment')
    //   .should('be.visible')
    //   .and('exist');
    waitExplicitly(constant_helper.MEDIUM_WAIT_TIME);
    shouldContainTextByWait(commandCenterLocatrs.verifyIfTaskIsCreated(), 'a few seconds');
    // shouldBevisibleByWait(commandCenterLocatrs.verifyIfTaskIsCreated())
    //   .contains('a few seconds')
    //   .should('be.visible');
  };
  
  const address = [
    {
      addressLine1: '88 Rue De Lacaune',
      addressLine2: '1',
      city: 'Gatineau',
      country: 'CA',
      state: 'QC',
      postalCode: '1015',
    },
    {
      addressLine1: '203 Rue De Sérignan',
      addressLine2: '2',
      city: 'Gatineau',
      country: 'CA',
      state: 'QC',
      postalCode: '1015',
    },
    {
      addressLine1: '115 Rue Bisson',
      addressLine2: '3',
      city: 'Gatineau',
      country: 'CA',
      state: 'QC',
      postalCode: '1100',
    },
    {
      addressLine1: '54 Rue Georges-Bilodeau',
      addressLine2: '4',
      city: 'Gatineau',
      country: 'CA',
      state: 'QC',
      postalCode: '1101',
    },
    {
      addressLine1: '442 Boulevard Des Grives',
      addressLine2: '5',
      city: 'Gatineau',
      country: 'CA',
      state: 'QC',
      postalCode: '1102',
    },
  ];
  
  const newContacts = [
    {
      firstName: 'Automation',
      lastName: 'Test',
      email: 'test@te',
      phoneNumber: '1234567890',
    },
    {
      firstName: 'Cypress',
      lastName: 'Automation',
      email: 'test1@te',
      phoneNumber: '12345690',
    },
    {
      firstName: 'Automation',
      lastName: 'Cypress',
      email: 'test2@te',
      phoneNumber: '123467890',
    },
    {
      firstName: 'Intergation',
      lastName: 'Tests',
      email: 'test2@te',
      phoneNumber: '123467890',
    },
  ];
  
  //**
  //* The function `getCustomLocationTabsSelector` gets the custom location tabs selector.
  //*/
  export const getCustomLocationTabs = () => {
    commandCenterLocatrs
      .getCustomLocationTabsSelector()
      .invoke('text')
      .then((text) => {
        expect(text).include('New Address').include('Coordinates');
      });
  };
  
  //**
  //* The function `getLocationButtonsSelectors` gets the location buttons selectors.
  //*/
  export const getLocationButtonsSelectors = () => {
    checkButtonIsClickable('Cancel');
    //getButton('span', 'Cancel').should('be.visible');
    shouldContainTextByWait(commandCenterLocatrs.getSetLocationSelector(), 'Set location');
    //commandCenterLocatrs.getSetLocationSelector().contains('Set location').should('be.visible');
  };
  
  //**
  //* The function `getLocationSection` gets the location section.
  export const getLocationButton = () => {
    getLocationButtonsSelectors();
    commandCenterLocatrs.getButton();
  };
  
  //**
  //* The function `getRandomAddress` gets a random address.
  //* @param {Array} address - The `address` parameter is an array that represents the address.
  //* @returns {Object}
  // */
  export const getRandomAddressLine = () => {
    const randomAddress = getRandomAddress(address);
    waitForAnElementToContainTextAndType(
      commandCenterLocatrs.getTaskInstructionsText(),
      constant_helper.getNewAddress.address1,
      randomAddress.addressLine1
    );
    // commandCenterLocatrs
    //   .getTaskInstructionsText()
    //   .contains(constant_helper.getNewAddress.address1)
    //   .parent()
    //   .find('input')
    //   .clear()
    //   .type(randomAddress.addressLine1);
    waitForAnElementToContainTextAndType(
      commandCenterLocatrs.getTaskInstructionsText(),
      constant_helper.getNewAddress.address2,
      randomAddress.addressLine2
    );
    // commandCenterLocatrs
    //   .getTaskInstructionsText()
    //   .contains(constant_helper.getNewAddress.address2)
    //   .parent()
    //   .find('input')
    //   .clear()
    //   .type(randomAddress.addressLine2);
    waitForAnElementToContainTextAndType(
      commandCenterLocatrs.getTaskInstructionsText(),
      constant_helper.getNewAddress.city,
      randomAddress.city
    );
    // commandCenterLocatrs
    //   .getTaskInstructionsText()
    //   .contains(constant_helper.getNewAddress.city)
    //   .parent()
    //   .find('input')
    //   .clear()
    //   .type(randomAddress.city);
    waitForAnElementToContainTextAndType(
      commandCenterLocatrs.getTaskInstructionsText(),
      constant_helper.getNewAddress.state,
      randomAddress.state
    );
    // commandCenterLocatrs
    //   .getTaskInstructionsText()
    //   .contains(constant_helper.getNewAddress.state)
    //   .parent()
    //   .find('input')
    //   .clear()
    //   .type(randomAddress.state)
    //
    waitForAnElementToContainTextAndType(
      commandCenterLocatrs.getTaskInstructionsText(),
      constant_helper.getNewAddress.zip,
      randomAddress.postalCode
    );
    // commandCenterLocatrs
    //   .getTaskInstructionsText()
    //   .contains(constant_helper.getNewAddress.zip)
    //   .parent()
    //   .find('input')
    //   .clear()
    //   .type(randomAddress.postalCode);
    waitForAnElementToContainTextAndType(
      commandCenterLocatrs.getTaskInstructionsText(),
      constant_helper.getNewAddress.country,
      randomAddress.country
    );
    // commandCenterLocatrs
    //   .getTaskInstructionsText()
    //   .contains(constant_helper.getNewAddress.country)
    //   .parent()
    //   .find('input')
    //   .clear()
    //   .type(randomAddress.country);
    cy.wrap(randomAddress.addressLine1).as('storedAddress');
  };
  
  //** The function `getRandomContact` will add random contact information to the dispatch task.
  export const getRandomContact = () => {
    const randomContact = newContacts[Math.floor(Math.random() * newContacts.length)];
    waitForAnElementToContainTextAndType(
      commandCenterLocatrs.getTaskInstructionsText(),
      constant_helper.getNewContactInformation.firstName,
      randomContact.firstName
    );
    // commandCenterLocatrs
    //   .getTaskInstructionsText()
    //   .contains(constant_helper.getNewContactInformation.firstName)
    //   .parent()
    //   .find('input')
    //   .clear()
    //   .type(randomContact.firstName);
    waitForAnElementToContainTextAndType(
      commandCenterLocatrs.getTaskInstructionsText(),
      constant_helper.getNewContactInformation.lastName,
      randomContact.lastName
    );
    // commandCenterLocatrs
    //   .getTaskInstructionsText()
    //   .contains(constant_helper.getNewContactInformation.lastName)
    //   .parent()
    //   .find('input')
    //   .clear()
    //   .type(randomContact.lastName);
    waitForAnElementToContainTextAndType(
      commandCenterLocatrs.getTaskInstructionsText(),
      constant_helper.getNewContactInformation.email,
      randomContact.email
    );
    // commandCenterLocatrs
    //   .getTaskInstructionsText()
    //   .contains(constant_helper.getNewContactInformation.email)
    //   .parent()
    //   .find('input')
    //   .clear()
    //   .type(randomContact.email);
    waitForAnElementToContainTextAndType(
      commandCenterLocatrs.getTaskInstructionsText(),
      constant_helper.getNewContactInformation.phoneNumber,
      randomContact.phoneNumber
    );
    // commandCenterLocatrs
    //   .getTaskInstructionsText()
    //   .contains(constant_helper.getNewContactInformation.phoneNumber)
    //   .parent()
    //   .find('input')
    //   .clear()
    //   .type(randomContact.phoneNumber);
  };
  
  //**
  //* The function `getRegion` gets the region and click on the region from dropdown list
  export const getRegion = () => {
    commandCenterLocatrs.getRegionInputSelector().within(() => {
      commandCenterLocatrs.getRegionInputControl().click();
      waitExplicitly(constant_helper.WAIT_TIME);
      waitForAnElementToContainTextAndClick(
        commandCenterLocatrs.getListIteamHeadquartersSelector().first().scrollIntoView(),
        'Headquarters'
      );
      //   commandCenterLocatrs
      //     .getListIteamHeadquartersSelector()
      //     .contains('Headquarters')
      //     .click({ force: true });
    });
    shouldBevisibleByWait(commandCenterLocatrs.verifyHeadquartersTitle()).contains('Headquarters');
  };
  
  //** The function `verifiyChangeLocationSection` verifies the change location section is visible.
  export const verifiyChangeLocationSection = () => {
    commandCenterLocatrs.getDispatchTasksFormLocationSection().scrollIntoView().should('be.visible');
    shouldContainTextByWait(commandCenterLocatrs.getDropdownValues(), 'Automation Test');
    // commandCenterLocatrs.getDropdownValues().contains('Automation Test').should('be.visible');
    cy.get('@storedAddress').then((storedAddress) => {
      commandCenterLocatrs
        .verifyListItemSubtitle()
        .should('be.visible')
        .invoke('text')
        .should('include', storedAddress);
    });
    commandCenterLocatrs
      .verifyListItemSubtitle()
      .should('be.visible')
      .invoke('text')
      .should('include', 'region: 2');
  };
  
  //**
  //* The function `setLocation` sets the location.
  //* `getRegion` gets the region of the location.
  //* `getButton` gets Set location button and clicks on it.
  //* `verifiyChangeLocationSection` verifies the change location section.
  export const setLocation = () => {
    getRegion();
    getButton('span', 'Set location').should('be.visible').and('not.be.disabled').click();
    verifiyChangeLocationSection();
  };
  
  /** * The function `createDisptach` creates a dispatch task with the given value and text.
   *@param {string} value - The value of the task type dropdown
   *@param {boolean} shouldSaveLocation - The value of the task type checkbox
   * @description This function creates a dispatch task with the given value and text.
   */
  export const createDispatchWithCustomLocation = (value: string, shouldSaveLocation: boolean) => {
    navigateToTable();
    getDropdownValue(value);
    commandCenterLocatrs.getTaskLabelName().should('be.visible');
    getAllDropdowns();
    getLocationSection();
    waitForanElementAndClick(commandCenterLocatrs.getPencilIcon());
    // commandCenterLocatrs.getPencilIcon().should('be.visible').and('exist').click();
    shouldContainTextByWait(commandCenterLocatrs.getDispatchTaskDrawer(), 'Select custom location');
    // commandCenterLocatrs
    //   .getDispatchTaskDrawer()
    //   .contains('Select custom location')
    //   .should('be.visible');
    getCustomLocationTabs();
    getLocationButtonsSelectors();
    commandCenterLocatrs.getSetLocationSelector().should('be.visible').and('not.be.enabled');
    waitForAnElementToContainTextAndType(
      commandCenterLocatrs.getTaskInstructionsText(),
      constant_helper.addName,
      'Automation Test'
    );
    // commandCenterLocatrs
    //   .getTaskInstructionsText()
    //   .contains(constant_helper.addName)
    //   .parent()
    //   .find('input')
    //   .type('Automation Test');
    getRandomAddressLine();
    if (shouldSaveLocation) {
      getButton('label', 'Save location').should('be.visible').click();
      getRandomContact();
    }
    setLocation();
    getNextButton();
    cy.waitForIntercept(commandCenterLocatrs.apiEndpoints.dispatchTasks, 'dispatchTasks', 'POST');
    getsButtons();
    waitForInterceptResponse('dispatchTasks', 201);
  };
  
  /**
   * The function `getDispatchTask` gets the dispatch task.
   * @param client - The `client` parameter is a string that represents the clients Name to be on the table view
   */
  export const verifyIfDispatchIsCreated = (client: string) => {
    waitForAnElementToContainTextAndClick(commandCenterLocatrs.clickOnTheTask(), client);
    // commandCenterLocatrs.clickOnTheTask().contains(client).should('be.visible').click();
  };
  
  //**
  //* The function `clickOnMap` clicks on the map icon, and prevents opening in the new tab.
  //*/
  export const clickOnMap = () => {
    cy.window().then((win) => {
      cy.stub(win, 'open').callsFake((url) => {
        win.location.href = url;
      });
      navigateToTable();
      commandCenterLocatrs
        .getTableView()
        .eq(1)
        .should('be.visible')
        .and('exist')
        .within(() => {
          waitForanElementAndClick(commandCenterLocatrs.clickOnTheTask().eq(0));
          // commandCenterLocatrs.clickOnTheTask().eq(0).should('exist').click();
        });
      shouldContainTextByWait(commandCenterLocatrs.getDispatchTaskDrawer(), 'Dispatch Task');
      // shouldBevisibleByWait(commandCenterLocatrs.getDispatchTaskDrawer())
      //   .should('be.visible')
      //   .and('exist')
      //   .contains('Dispatch Task');
      getButton('span', 'Map').should('be.visible').click();
      // commandCenterLocatrs
      //   .getMapIconSelector()
      //   .last() // Click the map icon
      //   .click();
      waitForanElementAndClick(commandCenterLocatrs.getMapIconSelector().last());
      cy.verifyUrl('/#/map');
    });
  };
  
  //** The function `getDispatTasksActionBar` gets elements on the dispatch task action bar .
  export const getDispatTasksActionBar = () => {
    const buttons = [
      'Edit',
      'Close Dispatch Task',
      'Assign Dispatch Task to User or Group',
      'Report',
      'Map',
    ];
    buttons.forEach((label) => {
      checkButtonIsClickable(label);
      // getButton('span', label)
      //   .should('be.visible')
      //   .and('not.be.disabled')
      //   .and('have.css', 'pointer-events', 'auto');
      if (label !== 'Map') {
        checkButtonIsClickable(label);
        // getButton('span', label).should('not.be.disabled');
      }
    });
  };
  
  /**
   * The function `getDispatchTask` gets the dispatch task.
   * @param search - The `search` parameter is a string that represents the search to be performed.
   */
  export const openAClosedDispatch = (search: string) => {
    getNavBarElements();
    commandCenterLocatrs.navigateToSearchTab().dblclick();
    cy.verifyUrl('/search');
    shouldContainTextByWait(
      commandCenterLocatrs.getSearchTableTitleSelector(),
      'What are you looking for?'
    );
    // shouldBevisibleByWait(commandCenterLocatrs.getSearchTableTitleSelector())
    //   .contains('What are you looking for?')
    //   .should('be.visible')
    //   .and('exist');
    waitForAnElementToContainTextAndClick(
      commandCenterLocatrs.getCloseDispatchTab(),
      'Closed dispatch'
    );
    //commandCenterLocatrs.getCloseDispatchTab().contains('Closed dispatch').should('be.visible');
    waitForAnElementAndType(commandCenterLocatrs.getSearchInputSelector(), search, 12000);
    // commandCenterLocatrs
    //   .getSearchInputSelector()
    //   .should('be.visible')
    //   .type(search, { timeout: 12000 });
    verifyUserNameInTheTable(search);
    getCloseDispatchHeaderSelector()
      .should('be.visible')
      .and('exist')
      .then(() => {
        waitForAnElementToContainTextAndClick(
          commandCenterLocatrs.getTableRowSelector(),
          'customer-'
        );
        // commandCenterLocatrs.getTableRowSelector().contains('customer-').click();
        shouldContainTextByWait(commandCenterLocatrs.getDispatchTaskDrawer(), 'Dispatch Task')
          // shouldBevisibleByWait(commandCenterLocatrs.getDispatchTaskDrawer())
          //   .should('be.visible')
          //   .contains('Dispatch Task')
          .then(() => {
            getContainerData();
            getButton('span', 'Open Dispatch Task').should('be.visible').click();
            getsButtons();
            getButton('span', 'Open Dispatch Task')
              .should('not.exist')
              .then(() => {
                shouldContainTextByWait(
                  commandCenterLocatrs.verifiyToasMsg(),
                  'The operation was successful'
                );
              });
            getDispatTasksActionBar();
            getDispatchDetails();
            getDetails(constant_helper.detailsDispatchTask.TaskType);
            getDetails(constant_helper.detailsDispatchTask.priceTier);
            getDetails(constant_helper.detailsDispatchTask.location);
            getDetails(constant_helper.detailsDispatchTask.dateTimeAndDuration);
            getDetails(constant_helper.detailsDispatchTask.moreInformation);
          });
      });
  };
  
  //** The function `validatingDispatchCreationUIfromMobileDeviceEntity` validates the dispatch creation UI from the mobile device entity.
  // @param {boolean} withAddress - The `withAddress` parameter is a boolean that represents the address.
  // @returns {void}
  export const validatingDispatchCreationUIfromMobileDeviceEntity = (withAddress = false) => {
    navigateToTable();
    getButton('i', 'warning').should('exist').click({ force: true });
    commandCenterLocatrs
      .getWidgetContainer()
      .should('be.visible')
      .within(() => {
        waitForAnElementToContainTextAndClick(
          commandCenterLocatrs.clickOnTheTask().eq(1),
          'Panic Alert'
        );
  
        // commandCenterLocatrs
        //   .clickOnTheTask()
        //   .eq(1)
        //   .contains('Panic Alert')
        //   .should('exist')
        //   .click({ force: true });
      });
    commandCenterLocatrs.getDrawerContent().contains('System Exception Tickets').should('exist');
    const buttons = [
      'New Dispatch',
      'Assign Ticket',
      'Leave Ticket',
      'Change System Exception Ticket Status',
    ];
  
    commandCenterLocatrs.getConatinerSelector().each(() => {
      buttons.forEach((label) => {
        checkButtonIsClickable(label);
        // getButton('span', label)
        //   .should('be.visible')
      });
    });
    waitForAnElementToContainTextAndClick(commandCenterLocatrs.getDrawerContent(), 'New Dispatch');
    // cy.contains('span', 'New Dispatch').should('be.visible').click();
    const checkButtonsVisibility = (labels) => {
      labels.forEach((label) => {
        shouldBevisibleByWait(getButton('span', label)).should('be.visible');
      });
    };
    const checkRadioButtons = () => {
      commandCenterLocatrs.radioButtons().eq(0).should('not.be.checked');
      waitExplicitly(constant_helper.WAIT_TIME); // Needed to add wait because the radio button was not getting checked in the time frame
      commandCenterLocatrs.radioButtons().last().should('not.be.checked');
    };
    const buttonLabels = [
      'Account:',
      'Address of the mobile device account',
      'Last Coordinates',
      'Last known coordinates sent by the mobile device',
    ];
    commandCenterLocatrs
      .getSystemExceptionTicketsFormPrefillSection()
      .should('exist')
      .then(() => {
        checkRadioButtons();
        checkButtonsVisibility(buttonLabels);
      });
    if (withAddress) {
      commandCenterLocatrs.radioButtons().eq(0).should('not.be.checked').click();
    }
    waitForAnElementToContainTextAndClick(commandCenterLocatrs.getButton(), 'Create new Task/Job');
    // commandCenterLocatrs
    //   .getButton()
    //   .contains('Create new Task/Job')
    //   .should('be.visible')
    //   .and('not.be.disabled')
    //   .click();
    commandCenterLocatrs.getTaskLabelName().should('be.visible');
    shouldBevisibleByWait(verifiyClientName()).contains('Aman QA Staging Testing');
    cy.waitForIntercept(commandCenterLocatrs.apiEndpoints.taskType, 'taskType', 'GET');
    selectDropwnOption(commandCenterLocatrs.dropdownSelector.taskType, 'Premise Check');
    waitForInterceptResponse('taskType', 200);
    getNextButton();
    verifyIfButtonsAreVisible();
    commandCenterLocatrs
      .getTableHeaderSelector()
      .should('exist')
      .invoke('text')
      .then((text) => {
        expect(text).to.include('System ID');
        expect(text).to.include('Last Updated On');
        expect(text).to.include('Type');
        expect(text).to.include('Created By');
        expect(text).to.include('Relation');
        expect(text).to.include('Status');
        expect(text).to.include('Assigned Operator');
      });
  };
  
  //**
  //* The function `getTableViewandClickOnCTA` gets the table view and clicks on the call to action.
  //* @param {string} namofDispatch - The `namofDispatch` parameter is a string that represents the name of the dispatch.
  // */
  export const getTableViewandClickOnCTA = (namofDispatch: string) => {
    commandCenterLocatrs
      .getTableView()
      .eq(0)
      .should('be.visible')
      .within(() => {
        waitForAnElementToContainTextAndClick(commandCenterLocatrs.clickOnTheTask(), namofDispatch);
        // commandCenterLocatrs
        //   .clickOnTheTask()
        //   .contains(namofDispatch)
        //   .should('exist')
        //   .click({ force: true });
      });
  };
  
  //**
  //* The function `handleCallToActionEntity` handles the call to action entity.
  //* @param {string} containerText - The `containerText` parameter is a string that represents the container text.
  //* @param {string} assignedOperator - The `assignedOperator` parameter is a string that represents the assigned operator.
  //* @param {boolean} assignOperator - The `assignOperator` parameter is a boolean that represents the assigned operator.
  // */
  export const handleCallToActionEntity = (
    namofDispatch: string,
    containerText: string,
    assignedOperator?: string,
    assignOperator: boolean = false
  ) => {
    navigateToTable();
    getTableViewandClickOnCTA(namofDispatch);
    shouldContainTextByWait(commandCenterLocatrs.getDrawerContent(), 'System Exception Tickets');
    //commandCenterLocatrs.getDrawerContent().contains('System Exception Tickets').should('exist');
    //waitForAnElementToContainTextAndClick(commandCenterLocatrs.getDrawerContent(), 'New Dispatch');
    waitForAnElementToContainTextAndClick(commandCenterLocatrs.getButton(), containerText);
    commandCenterLocatrs.getPageTitleBar().contains(containerText).should('exist');
    if (assignOperator) {
      commandCenterLocatrs.typeUser().click();
      commandCenterLocatrs.typeUser().should('exist').type('TrackTik Employee 1{enter}');
      waitForanElementAndClick(commandCenterLocatrs.getEntityPresentReleationSelector());
      // commandCenterLocatrs.getEntityPresentReleationSelector().should('exist').click();
    }
    getsButtons();
    if (assignedOperator) {
      commandCenterLocatrs.clickOnTheTask().contains(assignedOperator).should('be.visible');
    }
  };
  
  //**
  //* The function `changeStatusOfACallToActionEntity` changes the status of a call to action entity.
  //* @param {string} containerText - The `containerText` parameter is a string that represents the container text.
  // */
  export const changeStatusOfACallToActionEntity = (namofDispatch: string, containerText: string) => {
    const statuses = ['CLOSED', 'PENDING', 'OPEN'];
    statuses.forEach((status) => {
      navigateToTable();
      cy.waitForIntercept(
        commandCenterLocatrs.apiEndpoints.systemExceptionTickets,
        'systemExceptionTickets',
        'GET'
      );
      getTableViewandClickOnCTA(namofDispatch);
      shouldContainTextByWait(commandCenterLocatrs.getDrawerContent(), 'System Exception Tickets');
      // commandCenterLocatrs.getDrawerContent().contains('System Exception Tickets').should('exist');
      waitExplicitly(constant_helper.LONG_WAIT_TIME);
      waitForAnElementToContainTextAndClick(commandCenterLocatrs.getButton(), containerText);
      shouldContainTextByWait(commandCenterLocatrs.getPageTitleBar(), containerText);
      // commandCenterLocatrs.getPageTitleBar().contains(containerText).should('exist');
      waitForanElementAndClick(commandCenterLocatrs.clickOnStatusFieldSelector());
      // commandCenterLocatrs.clickOnStatusFieldSelector().should('exist').click();
      waitForAnElementToContainTextAndClick(commandCenterLocatrs.chooseStatusFromDropdown(), status);
      //commandCenterLocatrs.chooseStatusFromDropdown().should('exist').contains(status).click();
      getsButtons();
      cy.waitForIntercept(
        commandCenterLocatrs.apiEndpoints.systemExceptionTickets,
        'systemExceptionTickets',
        'GET'
      );
      commandCenterLocatrs
        .getColumnHeader()
        .contains('Status')
        .parents('th')
        .find('button .v-icon')
        .click({ force: true });
      commandCenterLocatrs.getModelStatusSelector().should('exist');
      commandCenterLocatrs.getStatusOnCheckboxSelector(status).should('exist').check({ force: true });
      cy.contains('button', 'Apply').click();
      waitForInterceptResponse('systemExceptionTickets', 200);
      commandCenterLocatrs.getGerneralInformationInput().should('exist');
      const formattedStatus = status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
      commandCenterLocatrs.getGerneralInformationInput().should('exist');
      commandCenterLocatrs.verifyStatus().should(($el) => {
        expect($el.text().trim().toLowerCase()).to.include(formattedStatus.toLowerCase());
      });
      getTableViewandClickOnCTA(namofDispatch);
    });
  };
  
  //**
  //* The function `getRegionsButtons` gets the regions buttons.
  // */
  export const getRegionsButtons = () => {
    shouldContainTextByWait(commandCenterLocatrs.getButton(), ' Cancel ')
      // commandCenterLocatrs
      //   .getButton()
      //   .contains(' Cancel ', { timeout: 12000 })
      //   .should('be.visible')
      //   .and('not.be.disabled')
      .then(() => {
        waitForAnElementToContainTextAndClick(commandCenterLocatrs.getButton(), ' Save Changes ');
        // commandCenterLocatrs
        //   .getButton()
        //   .contains(' Save Changes ', { timeout: 12000 })
        //   .should('be.visible')
        //   .and('not.be.disabled')
        //   .click();
      });
  };
  
  //**
  //* The function `createANewOperationCenter` creates a new operation center.
  //* @param {string} operationCenter - The `operationCenter` parameter is a string that represents the operation center.
  // */
  export const createAnOperater = () => {
    shouldBevisibleByWait(commandCenterLocatrs.getOperationCenterTabs()).then(($tab) => {
      const operationCenterTabs = $tab.text();
      expect(operationCenterTabs)
        .include('Operation Center')
        .include('CTA instructions')
        .include('Regions Geofencing');
    });
    shouldBevisibleByWait(commandCenterLocatrs.getTableHeaderSelector()).then(($tabs) => {
      const operationCenterHeaderTabs = $tabs.text();
      expect(operationCenterHeaderTabs)
        .include('Name')
        .include('Operators')
        .include('Present Operators')
        .include('Regions')
        .include('Policies');
    });
    waitForAnElementToContainTextAndClick(commandCenterLocatrs.getButton(), 'New');
    shouldContainTextByWait(commandCenterLocatrs.getDrawerContent(), 'Create');
    // commandCenterLocatrs.getButton().contains('New').should('be.visible').click();
    //commandCenterLocatrs.getDrawerContent().contains('Create').should('exist');
    const operationCenter = generateRandomOperationCenter();
    waitForAnElementToContainTextAndType(
      commandCenterLocatrs.getNameOfInputFieldSelector(),
      constant_helper.addName,
      operationCenter
    )
      // commandCenterLocatrs
      //   .getNameOfInputFieldSelector()
      //   .contains(constant_helper.addName)
      //   .parent()
      //   .find('input')
      //   .type(operationCenter)
      .then(() => {
        cy.wrap(operationCenter).as('savedCustomerId');
      });
    cy.waitForIntercept(
      commandCenterLocatrs.apiEndpoints.operationCenter,
      'operationCenters',
      'POST'
    );
    getsButtons();
    waitForInterceptResponse('operationCenters', 201);
    cy.reload();
    commandCenterLocatrs
      .getColumnHeader()
      .contains(constant_helper.addName)
      .parents('th')
      .find('button .v-icon')
      .click({ force: true });
    cy.get('@savedCustomerId').then(() => {
      commandCenterLocatrs
        .getSearchOnFilter()
        .should('exist')
        .then(($input) => {
          cy.wrap($input).should('be.visible').type(`$savedCustomerId`);
          getButton('button', 'Apply').click();
        });
      waitForAnElementToContainTextAndClick(
        commandCenterLocatrs.getColumnContentSelector(),
        'operation-center'
      );
      // commandCenterLocatrs
      //   .getColumnContentSelector()
      //   .should('exist')
      //   .contains('operation-center')
      //   .click({ force: true });
    });
  };
  
  //** The function `manageAssignmet` manages the assignment.
  //* @param {string} type - The `type` parameter is a string that represents the type.
  //* @param {string} action - The `action` parameter is a string that represents the action.
  //* @param {string} region - The `region` parameter is a string that represents the region.
  // */
  export const manageAssignment = (
    type: 'region' | 'operator',
    action: 'assign' | 'unassign',
    regionAndOpeatior?: string
  ) => {
    cy.waitForIntercept(
      commandCenterLocatrs.apiEndpoints.operationCenterRegions,
      'operationCenterRegions',
      'GET'
    );
    commandCenterLocatrs
      .getFirstColumnSelector()
      .should('exist')
      .then(($elements) => {
        console.log('Found elements:', $elements.length);
      })
      .contains('operation-center')
      .click();
  
    commandCenterLocatrs
      .getTabNameSelector()
      .contains(type === 'region' ? 'Regions' : 'Operators')
      .click();
    cy.document().its('readyState').should('eq', 'complete');
  
    if (type === 'region') {
      commandCenterLocatrs
        .getTreeViewNodeSelector()
        .should('exist')
        .within(() => {
          commandCenterLocatrs.toggleTheTreeViewNode().should('exist').click();
        });
      waitForInterceptResponse('operationCenterRegions', 200);
      waitForAnElementToContainTextAndClick(
        commandCenterLocatrs.getTreeViewNodelabelSelector(),
        ' Africa '
      );
  
      getRegionsButtons();
      commandCenterLocatrs.getRegionColumnSelector().should('exist').contains(regionAndOpeatior!);
    } else if (type === 'operator') {
      commandCenterLocatrs.toggleOperator().should('exist').click();
  
      if (action === 'assign') {
        commandCenterLocatrs
          .getOperatorInputSelector()
          .contains('Browse')
          .parent()
          .find('input')
          .first()
          .type('TrackTik Employee 1{enter}{enter}');
        waitForAnElementToContainTextAndClick(
          commandCenterLocatrs.verifiyOperatorName(),
          'TrackTik Employee 1'
        );
  
        commandCenterLocatrs.getButtonIconSelector().should('exist').click();
  
        shouldBevisibleByWait(commandCenterLocatrs.verifyEmployeeListTile()).then(($text) => {
          const employeeInfo = $text.text();
          expect(employeeInfo).include('TrackTik Employee 1').include('N/A').include('Headquarters');
        });
        commandCenterLocatrs.getDeleteButtonSelector().should('be.visible').and('not.be.disabled');
        commandCenterLocatrs.getOperatorColumnSelector().should('exist').contains(regionAndOpeatior!);
      } else {
        waitForanElementAndClick(commandCenterLocatrs.getDeleteButtonSelector());
        // commandCenterLocatrs
        //   .getDeleteButtonSelector()
        //   .should('be.visible')
        //   .and('not.be.disabled')
        //   .click();
        commandCenterLocatrs.getOperatorColumnSelector().should('exist').contains(regionAndOpeatior!);
      }
    }
  };
  
  //**
  //* The function `getArchiveAnOperatior` archives an operator.
  // */
  export const getArchiveAnOperatior = () => {
    waitForAnElementToContainTextAndClick(
      commandCenterLocatrs.getFirstColumnSelector(),
      'operation-center'
    );
    // commandCenterLocatrs
    //   .getFirstColumnSelector()
    //   .should('exist')
    //   .contains('operation-center')
    //   .click();
    waitForAnElementToContainTextAndClick(commandCenterLocatrs.getConatinerSelector(), 'Archive');
    // commandCenterLocatrs.getConatinerSelector().contains('Archive').click();
    getsButtons();
    commandCenterLocatrs
      .getFirstColumnSelector()
      .should('exist')
      .and('not.contain', 'operation-center');
  };

  -------

  import { LocatorType } from './enum';

export const generateRandomNumber = () => {
  const randomNumber = Math.floor(Math.random() * 1000);
  return randomNumber;
};

const generatedNumbers = new Set<number>();

/**
 * Generates a random number that is not already in the generatedNumbers set.
 * @returns The generated random number.
 */
export const generateuniqueRandomNumber = () => {
  let randomNumber;
  do {
    randomNumber = Math.floor(Math.random() * 1000);
  } while (generatedNumbers.has(randomNumber));

  generatedNumbers.add(randomNumber);
  return randomNumber;
};

/**
 * Checks if the given element is visible within a specified timeout.
 * @param element - The element to check for visibility.
 * @param timeout - The timeout value in milliseconds (default: 50000).
 * @returns A Cypress chainable object representing the visibility check.
 */
export const shouldBevisibleByWait = (
  element: Cypress.Chainable<JQuery<HTMLElement>>,
  timeout = 5000
): Cypress.Chainable<JQuery<HTMLElement>> => {
  return element.should('be.visible', { timeout });
};

/**
 * Checks if the given element includes the specified text.
 * @param element - The element to check.
 * @param text - The text to look for.
 * @returns A Cypress.Chainable<JQuery<HTMLElement>> representing the element.
 */
export const shouldIncludeText = (
  element: Cypress.Chainable<JQuery<HTMLElement>>,
  text: string
): Cypress.Chainable<JQuery<HTMLElement>> => {
  return element.should('include.text', text);
};

/**
 * Waits for an element to become visible by using a wait and retry mechanism.
 * @param element - The element to wait for visibility.
 * @param timeout - The maximum time to wait for the element to become visible (default: 50000ms).
 * @param retryInterval - The interval between retry attempts (default: 1000ms).
 * @returns A Cypress.Chainable<JQuery<HTMLElement>> representing the visible element.
 * @throws Error if the element is not visible within the specified timeout.
 */
export const shouldBeVisibleByWaitAndRetry = (
  element: Cypress.Chainable<JQuery<HTMLElement>>,
  timeout = 50000,
  retryInterval = 1000
): Cypress.Chainable<JQuery<HTMLElement>> => {
  const startTime = Date.now();

  const checkVisibility = (attempt = 1): Cypress.Chainable<JQuery<HTMLElement>> => {
    return element.then(($el) => {
      if ($el.is(':visible')) {
        cy.log(`Element became visible after ${attempt} attempt(s)`);
        return cy.wrap($el);
      } else if (Date.now() - startTime < timeout) {
        cy.log(`Retry #${attempt}: Element not visible yet. Retrying in ${retryInterval}ms...`);
        cy.wait(retryInterval);
        return checkVisibility(attempt + 1);
      } else {
        cy.log(`Element not visible after ${timeout}ms`);
        throw new Error(`Element not visible after ${timeout}ms`);
      }
    });
  };

  cy.log(
    `🔍 Waiting for element to be visible (timeout: ${timeout}ms, retry interval: ${retryInterval}ms)`
  );
  return checkVisibility();
};

/**
 * Waits for an element to become visible by retrying at specified intervals.
 *
 * @param selector - The selector of the element to check visibility for.
 * @param type - The type of locator used for the selector (default: LocatorType.CSS).
 * @param timeout - The maximum time to wait for the element to become visible (default: 50000ms).
 * @param retryInterval - The interval between retries in milliseconds (default: 1000ms).
 * @returns A Cypress.Chainable<JQuery<HTMLElement>> representing the visible element.
 * @throws Error if the element is not visible within the specified timeout.
 */
export const shouldBeVisibleByWaitAndRetries = (
  selector: string,
  type: LocatorType = LocatorType.CSS,
  timeout = 50000,
  retryInterval = 1000
): Cypress.Chainable<JQuery<HTMLElement>> => {
  const startTime = Date.now();

  const checkVisibility = (attempt = 1): Cypress.Chainable<JQuery<HTMLElement>> => {
    cy.log(`Retry #${attempt}: Checking visibility of '${selector}'`);

    return getElement(selector, type, timeout).then(($el) => {
      if ($el.is(':visible')) {
        cy.log(`Element became visible after ${attempt} attempt(s)`);
        return cy.wrap($el);
      } else if (Date.now() - startTime < timeout) {
        cy.log(`Retry #${attempt}: Element not visible yet. Retrying in ${retryInterval}ms...`);
        cy.wait(retryInterval);
        return checkVisibility(attempt + 1);
      } else {
        cy.log(`Element not visible after ${timeout}ms`);
        throw new Error(`Element not visible after ${timeout}ms`);
      }
    });
  };

  return checkVisibility();
};

/**
 * Checks if the given element contains the specified text within a specified timeout.
 * @param element - The element to check.
 * @param text - The text to search for within the element.
 * @param timeout - The maximum time to wait for the element to contain the text (default: 50000 milliseconds).
 * @returns A Cypress chainable object representing the visibility of the element containing the text.
 */
export function shouldContainTextByWait(
  element: Cypress.Chainable<JQuery<HTMLElement>>,
  text: string,
  timeout = 5000
): Cypress.Chainable<JQuery<HTMLElement>> {
  return element.contains(text).should('be.visible', { timeout });
}

/**
 * Waits for an element to be visible and then clicks on it.
 *
 * @param element - The element to wait for and click on.
 */
export function waitForanElementAndClick(
  element: Cypress.Chainable<JQuery<HTMLElement>>,
  timeout = 5000,
  forceClick = false
): Cypress.Chainable<JQuery<HTMLElement>> {
  return shouldBevisibleByWait(element, timeout).then(($el) => {
    cy.wrap($el).click({ force: forceClick });
    return cy.wrap($el); // Return wrapped element for further chaining if needed
  });
}

export function forceType(
  element: Cypress.Chainable<JQuery<HTMLElement>>,
  text: string,
  forceClick = false,
  delay = 100
): Cypress.Chainable<JQuery<HTMLElement>> {
  return element.type(text, { force: forceClick, delay });
}

/**
 * Waits for an element to contain the specified text and then clicks on it.
 *
 * @param element - The element to wait for.
 * @param text - The text to wait for in the element.
 */
export function waitForAnElementToContainTextAndClick(
  element: Cypress.Chainable<JQuery<HTMLElement>>,
  text: string,
  forceClick = false,
  timeout = 5000
): Cypress.Chainable<JQuery<HTMLElement>> {
  return shouldContainTextByWait(element, text, timeout).then(($el) => {
    cy.wrap($el).click({ force: forceClick });
    return cy.wrap($el); // Return wrapped element for further chaining if needed
  });
}

/**
 * Waits for an element to be visible and types the given input into it.
 *
 * @param element - The element to wait for and type into.
 * @param input - The input to be typed into the element.
 */
export function waitForAnElementAndType(
  element: Cypress.Chainable<JQuery<HTMLElement>>,
  input: string,
  timeout = 5000
): Cypress.Chainable<JQuery<HTMLElement>> {
  return shouldBevisibleByWait(element, timeout).then(($el) => {
    cy.wrap($el).clear().type(input, { delay: 100 }); // Optional: Add typing delay
    return cy.wrap($el); // Return wrapped element for further chaining
  });
}

/**
 *
 *
 * @export
 * @param {string} date
 * @return {*}  {number}
 */
export function getCurrentDay(date: string): number {
  const lastTwoCharacters = date.slice(-2);
  const cleanedLastTwoCharacters = lastTwoCharacters.replace(/^0+/, '');
  const day = parseInt(cleanedLastTwoCharacters, 10);
  return day;
}

/**
 * The function `getCurrentTime` gets the current time and formats it in the specified timezone.
 * @param {string} timezone - The `timezone` parameter is a string that represents the chosen
 * timezone on which the time will be formatted.
 * @return {hours} The current hour on the given timezone.
 */
export function getCurrentTime(timezone: string = 'America/Toronto'): {
  hours: string;
} {
  const now = new Date();

  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: timezone,
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  });

  const formattedTime = formatter.formatToParts(now);
  const hourPart = formattedTime.find((part) => part.type === 'hour');

  const hours = hourPart?.value.startsWith('0') ? hourPart.value.slice(1) : hourPart?.value || '0';

  return { hours };
}

/**
 * The 'scrollToBottom' function is used to scroll to the bottom of the page body.
 */
export const scrollToBottom = () => {
  cy.window().then((win) => {
    win.scrollTo(0, win.document.body.scrollHeight);
  });
};

/**
 * Returns a formatted string representing a future date based on the current date.
 * @param months - The number of months to add to the current date.
 * @param days - The number of days to add to the current date.
 * @returns A formatted string in the format "MM/DD/YYYY".
 */
export function getDaysInFormatedString(months: number, days: number): string {
  const date = new Date();
  const month = String(date.getMonth() + months).padStart(2, '0');
  const day = String(date.getDate() + days).padStart(2, '0');
  const year = date.getFullYear();

  const formattedDate = `${month}/${day}/${year}`;
  return formattedDate;
}

/**
 * Waits for the intercept response with the specified name and status code.
 * @param name - The name of the intercept response.
 * @param statusCode - The expected status code of the intercept response.
 */
export function waitForInterceptResponse(name: string, statusCode: number) {
  cy.wait(`@${name}`, { timeout: 80000 }).its('response.statusCode').should('eq', statusCode);
}

/**
 * Waits for a specific network request to be intercepted and then clicks on a specified element.
 * @param interceptUrl The URL of the network request to intercept.
 * @param interceptName The name to assign to the intercepted request.
 * @param method The HTTP method of the intercepted request.
 * @param locator The locator of the element to click on.
 * @param statusCode The expected status code of the intercepted request.
 * @param timeout The maximum time to wait for the intercepted request, in milliseconds. Default is 5000ms.
 *
 */
export function waitForInterceptAndClick(
  interceptUrl: string,
  interceptName: string,
  method: string,
  element: string,
  locator: LocatorType = LocatorType.CSS,
  statusCode: number,
  timeout: number = 10000
) {
  cy.intercept(method, interceptUrl).as(interceptName);

  getElement(element, locator, timeout).should('be.visible').click();

  cy.wait(`@${interceptName}`, { timeout: timeout })
    .its('response.statusCode')
    .should('eq', statusCode);
}

/**
 * Waits for an API intercept, verifies an element contains text, and clicks it.
 * @param interceptUrl - The URL to intercept
 * @param interceptName - Alias for the intercepted request
 * @param method - HTTP method (GET, POST, etc.)
 * @param element - The selector string (CSS or XPath)
 * @param locator - Locator type (CSS or XPath)
 * @param text - The text to match inside the element
 * @param statusCode - Expected response status code
 * @param timeout - Request timeout (default: 10s)
 */
export function waitForInterceptContainAndClick(
  interceptUrl: string,
  interceptName: string,
  method: string,
  element: string,
  locator: LocatorType = LocatorType.CSS,
  text: string,
  statusCode: number,
  timeout: number = 10000
) {
  cy.intercept(method, interceptUrl).as(interceptName);

  getElement(element, locator, timeout).should('exist').contains(text).click();

  cy.wait(`@${interceptName}`, { timeout }).its('response.statusCode').should('eq', statusCode);
}

/**
 *
 * @parm {string} date  - The date to be formatted.
 * @returns {string} - The formatted date in the format "MM/DD/YYYY".
 *
 */
export const getFormattedDate = () => {
  const today = new Date();
  return `${String(today.getMonth() + 1).padStart(2, '0')}/${String(today.getDate()).padStart(
    2,
    '0'
  )}/${today.getFullYear()}`;
};

/**
 * Waits until the specified element is visible.
 * @param element - The element to wait for.
 * @param timeout - The maximum time to wait in milliseconds. Default is 10000ms.
 * @param interval - The interval between checks in milliseconds. Default is 500ms.
 */
export function waitUntillElementIsVisible(
  element: string,
  timeout: number = 80000,
  interval: number = 500
) {
  cy.waitUntil(
    () =>
      cy.document().then((doc) => {
        const $el = doc.querySelector(element);
        if ($el) {
          return Cypress.$($el).is(':visible');
        }
        return false;
      }),
    {
      timeout: timeout,
      interval: interval,
      errorMsg: `${element} is not visible`,
    }
  );
}

export const getRandomAddress = (address) => {
  return address[Math.floor(Math.random() * address.length)];
};

/**
 * Get element with optional timeout.
 * @param selector - The selector string (CSS or XPath)
 * @param type - The locator type (CSS or XPath)
 * @param timeout - Optional timeout (in milliseconds) before failing
 * @returns Cypress chainable element
 */
export const getElement = (
  selector: string,
  type: LocatorType = LocatorType.CSS,
  timeout: number = 10000
) => {
  return type === LocatorType.XPATH
    ? cy.xpath(selector, { timeout })
    : cy.get(selector, { timeout });
};

export const waitExplicitly = (timeout: number = 1000) => {
  cy.wait(timeout);
};

export function waitForAnElementToContainTextAndType(
  element: Cypress.Chainable<JQuery<HTMLElement>>,
  text: string,
  input: string,
  timeout = 5000
): Cypress.Chainable<JQuery<HTMLElement>> {
  return shouldBevisibleByWait(element, timeout).then(($el) => {
    const target = $el.is('input, textarea')
      ? cy.wrap($el)
      : cy.wrap($el).contains(text).parent().find('input, textarea');
    target.clear().type(input, { delay: 100 }).type('{enter}');
    return target;
  });
}

export function checkButtonIsClickable(label: string): Cypress.Chainable<JQuery<HTMLElement>> {
  return cy.contains('span', label).should('be.visible').and('exist').and('not.be.disabled');
}
