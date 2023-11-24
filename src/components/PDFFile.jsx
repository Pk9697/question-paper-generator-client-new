import { Document, Page, Text, StyleSheet } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  subtitle: {
    fontSize: 16,
    margin: 12,
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: 'justify',
    fontFamily: 'Times-Roman',
  },
  question: {
    margin: 12,
    fontSize: 14,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
})

function PDFFile({ questions = [] }) {
  return (
    <Document>
      <Page style={styles.body}>
        <Text style={styles.header} fixed>
          ~ Maximum Marks : 100 ~
        </Text>

        {questions.map(({ id, marks, question }, index) => (
          <div key={id}>
            <Text style={styles.subtitle}>Question No: {index + 1}</Text>
            <Text style={styles.question}>
              {question} {marks} Marks
            </Text>
          </div>
        ))}

        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
  )
}

export default PDFFile
