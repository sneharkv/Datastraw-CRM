function getSpreadsheet() {
  return SpreadsheetApp.openById('1bjdDX_6zTqAOY7kHFjXwzw-PX8wGFW6_QykvwVbILGQ');
}

function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('Datastraw CRM')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function getAllData() {
  try {
    var ss = getSpreadsheet();
    
    // Get tickets
    var ticketSheet = ss.getSheetByName('Tickets');
    var tickets = [];
    if (ticketSheet.getLastRow() > 1) {
      var tData = ticketSheet.getDataRange().getValues();
      var tHeaders = tData[0];
      for (var i = 1; i < tData.length; i++) {
        if (tData[i][0] === '') continue;
        var ticket = {};
        tHeaders.forEach(function(h, idx) { ticket[h] = tData[i][idx]; });
        tickets.push(ticket);
      }
    }

    // Get team
    var teamSheet = ss.getSheetByName('Team');
    var members = [];
    if (teamSheet.getLastRow() > 1) {
      var mData = teamSheet.getDataRange().getValues();
      var mHeaders = mData[0];
      for (var i = 1; i < mData.length; i++) {
        if (mData[i][0] === '') continue;
        var member = {};
        mHeaders.forEach(function(h, idx) { member[h] = mData[i][idx]; });
        members.push(member);
      }
    }

    // Stats
    var stats = { total: 0, pending: 0, inProgress: 0, resolved: 0, waiting: 0 };
    tickets.forEach(function(t) {
      stats.total++;
      if (t.Status === 'Pending') stats.pending++;
      else if (t.Status === 'In Progress') stats.inProgress++;
      else if (t.Status === 'Resolved') stats.resolved++;
      else stats.waiting++;
    });

    return { success: true, tickets: tickets, members: members, stats: stats };
  } catch(e) {
    return { success: false, error: e.message };
  }
}

function createTicket(data) {
  try {
    var ss = SpreadsheetApp.openById('1bjdDX_6zTqAOY7kHFjXwzw-PX8wGFW6_QykvwVbILGQ');
    var sheet = ss.getSheetByName('Tickets');
    var lastRow = sheet.getLastRow();
    var ticketID = 'TKT' + String(lastRow).padStart(4, '0');
    var now = new Date().toISOString();
    sheet.appendRow([
      ticketID, data.customerName, data.email, data.phone,
      data.channel, 'Pending', data.priority || 'Medium',
      data.issueDescription, data.queryTheme || '', '',
      data.assignedTo || '', 'None', data.orderID || '',
      now, now, '', '', ''
    ]);
    return { success: true, ticketID: ticketID };
  } catch(e) {
    return { success: false, error: e.message };
  }
}

function updateTicket(ticketID, data) {
  try {
    var sheet = getSpreadsheet().getSheetByName('Tickets');
    var values = sheet.getDataRange().getValues();
    for (var i = 1; i < values.length; i++) {
      if (values[i][0] === ticketID) {
        var now = new Date().toISOString();
        sheet.getRange(i+1, 2).setValue(data.customerName);
        sheet.getRange(i+1, 3).setValue(data.email);
        sheet.getRange(i+1, 4).setValue(data.phone);
        sheet.getRange(i+1, 5).setValue(data.channel);
        sheet.getRange(i+1, 6).setValue(data.status);
        sheet.getRange(i+1, 7).setValue(data.priority);
        sheet.getRange(i+1, 8).setValue(data.issueDescription);
        sheet.getRange(i+1, 9).setValue(data.queryTheme);
        sheet.getRange(i+1, 10).setValue(data.actionTaken);
        sheet.getRange(i+1, 11).setValue(data.assignedTo);
        sheet.getRange(i+1, 12).setValue(data.escalationLevel);
        sheet.getRange(i+1, 13).setValue(data.orderID);
        sheet.getRange(i+1, 15).setValue(now);
        sheet.getRange(i+1, 16).setValue(data.resolutionNotes);
        sheet.getRange(i+1, 17).setValue(data.chatTranscript);
        return { success: true };
      }
    }
    return { success: false, error: 'Ticket not found' };
  } catch(e) {
    return { success: false, error: e.message };
  }
}

function deleteTicket(ticketID) {
  try {
    var sheet = getSpreadsheet().getSheetByName('Tickets');
    var values = sheet.getDataRange().getValues();
    for (var i = 1; i < values.length; i++) {
      if (values[i][0] === ticketID) {
        sheet.deleteRow(i + 1);
        return { success: true };
      }
    }
    return { success: false, error: 'Ticket not found' };
  } catch(e) {
    return { success: false, error: e.message };
  }
}

function getOrderByID(orderID) {
  try {
    var sheet = getSpreadsheet().getSheetByName('Orders');
    var data = sheet.getDataRange().getValues();
    var headers = data[0];
    for (var i = 1; i < data.length; i++) {
      if (String(data[i][0]) === String(orderID)) {
        var order = {};
        headers.forEach(function(h, idx) { order[h] = data[i][idx]; });
        return { success: true, order: order };
      }
    }
    return { success: false, error: 'Order not found' };
  } catch(e) {
    return { success: false, error: e.message };
  }
}

