describe("sort_index", function() {

  function sort_test(field, column_index, first_value, last_value) {
    browser.get('index.php?project=InsightExample&date=2010-07-07');

    // Make sure this is the header we think it is.
    var header = element.all(by.className('table-heading')).all(by.tagName('th')).filter(function(elem) { return elem.isDisplayed(); }).get(column_index);
    expect(header.getText()).toBe(field);

    // Click the header to sort by site.
    header.click();

    // Make sure the sort indicator has the class we expect.
    expect(header.element(by.tagName('span')).getAttribute('class')).toContain("glyphicon-chevron-down");

    // Filter out the table cells that aren't currently displayed.
    var visible_tds = element(by.repeater('build in buildgroup.builds').row(0)).all(by.tagName('td')).filter(function(elem) { return elem.isDisplayed(); });

    // Check that the expected value is at the top of the list.
    expect(visible_tds.get(column_index).getText()).toBe(first_value);

    // Reverse order & check values again.
    header.click();
    expect(header.element(by.tagName('span')).getAttribute('class')).toContain("glyphicon-chevron-up");
    expect(visible_tds.get(column_index).getText()).toBe(last_value);
  }

  it("sort by Site", function() {
    sort_test('Site', 0, 'dash13.kitware', 'thurmite.kitware');
  });

  it("sort by Build Name", function() {
    sort_test('Build Name', 1, 'zApp-Win64-Vista-vs9-Release', 'zApps-Win32-vs60');
  });

  it("sort by Updated Files", function() {
    sort_test('Files', 2, '0', '4');
  });

  it("sort by Configure Errors", function() {
    sort_test('Error', 3, '0', '2');
  });

  it("sort by Configure Warnings", function() {
    sort_test('Warn', 4, '0', '2');
  });

  it("sort by Build Errors", function() {
    sort_test('Error', 5, '0', '2');
  });

  it("sort by Build Warnings", function() {
    sort_test('Warn', 6, '0', '3');
  });

  it("sort by Test Not Run", function() {
    sort_test('Not Run', 7, '1', '3');
  });

  it("sort by Test Fail", function() {
    sort_test('Fail', 8, '1', '3');
  });

  it("sort by Test Pass", function() {
    sort_test('Pass', 9, '1', '3');
  });

  it("sort by Build Time", function() {
    sort_test('Build Time', 10, 'Jul 07, 2010 - 08:22 EDT', 'Jul 07, 2010 - 08:26 EDT');
  });

});