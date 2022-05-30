                    groupName: '',
                    groupOwner: '',
                    description: '',
                    rank: '',
                    members: [],
                    rating: 0,



                    var members = documentSnapshot.data().userName;
          const ArrMembers = members.split(',');
          //console.log(ArrMembers);
          setInputMembers(ArrMembers),


          return (
            <SafeAreaView style={{flex: 1, backgroundColor: '#191919'}}>
              <ScrollView>
                <View style={{alignItems: 'center', flexDirection: 'row'}}>
                  <TouchableOpacity
                    style={styles.btnSubmit}
                    onPress={() => MoverCriarGrupos()}>
                    <Text style={styles.searchText}> Criar Grupos</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.btnSubmit}
                    onPress={() => MoverCriarGrupos()}>
                    <Text style={styles.searchText}> Buscar Grupos</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.container2}>
                  <Text style={styles.meusGruposText}>MEUS GRUPOS</Text>
        
                  <ScrollView horizontal={true}>
                    <View style={styles.containerJogos}>
                      <TouchableOpacity
                        style={styles.buttonMaisStyle}
                        activeOpacity={0.5}>
                        <View style={styles.boxGrupos}>
                          <Text style={styles.grupoTitleText}>GRUPO LOLZINHO</Text>
                          <Text style={styles.grupoText}>Jogo: League of Legends</Text>
                          <Text style={styles.grupoText}>Participantes: 2/5</Text>
                          <Text style={styles.grupoText}>Modalidade: Competitivo</Text>
                          <Text style={styles.grupoText}>Rank: Bronze</Text>
                          <Text style={styles.grupoText}>Avaliação: ⭐⭐⭐⭐⭐</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.buttonMaisStyle}
                        activeOpacity={0.5}>
                        <View style={styles.boxGrupos}>
                          <Text style={styles.grupoTitleText}>GRUPO LOLZINHO</Text>
                          <Text style={styles.grupoText}>Jogo: League of Legends</Text>
                          <Text style={styles.grupoText}>Participantes: 2/5</Text>
                          <Text style={styles.grupoText}>Modalidade: Competitivo</Text>
                          <Text style={styles.grupoText}>Rank: Bronze</Text>
                          <Text style={styles.grupoText}>Avaliação: ⭐⭐⭐</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.buttonMaisStyle}
                        activeOpacity={0.5}>
                        <View style={styles.boxGrupos}>
                          <Text style={styles.grupoTitleText}>GRUPO LOLZINHO</Text>
                          <Text style={styles.grupoText}>Jogo: League of Legends</Text>
                          <Text style={styles.grupoText}>Participantes: 2/5</Text>
                          <Text style={styles.grupoText}>Modalidade: Competitivo</Text>
                          <Text style={styles.grupoText}>Rank: Bronze</Text>
                          <Text style={styles.grupoText}>Avaliação: ⭐⭐⭐⭐</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </ScrollView>
                </View>
        
                <View style={styles.container3}>
                  <Text style={styles.meusGruposText}>GRUPOS QUE PARTICIPO</Text>
        
                  <ScrollView horizontal={true}>
                    <View style={styles.containerJogos}>
                      <TouchableOpacity
                        style={styles.buttonMaisStyle}
                        activeOpacity={0.5}>
                        <View style={styles.boxGrupos}>
                          <Text style={styles.grupoTitleText}>GRUPO LOLZINHO</Text>
                          <Text style={styles.grupoText}>Jogo: League of Legends</Text>
                          <Text style={styles.grupoText}>Participantes: 2/5</Text>
                          <Text style={styles.grupoText}>Modalidade: Competitivo</Text>
                          <Text style={styles.grupoText}>Rank: Bronze</Text>
                          <Text style={styles.grupoText}>Avaliação: ⭐⭐⭐⭐⭐</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.buttonMaisStyle}
                        activeOpacity={0.5}>
                        <View style={styles.boxGrupos}>
                          <Text style={styles.grupoTitleText}>SOLO 2</Text>
                          <Text style={styles.grupoText}>Jogo: League of Legends</Text>
                          <Text style={styles.grupoText}>Participantes: 1/2</Text>
                          <Text style={styles.grupoText}>Modalidade: Competitivo</Text>
                          <Text style={styles.grupoText}>Rank: Diamante</Text>
                          <Text style={styles.grupoText}>Avaliação: ⭐⭐⭐⭐</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.buttonMaisStyle}
                        activeOpacity={0.5}>
                        <View style={styles.boxGrupos}>
                          <Text style={styles.grupoTitleText}>CSTRIKE</Text>
                          <Text style={styles.grupoText}>Jogo: CS-GO</Text>
                          <Text style={styles.grupoText}>Participantes: 4/5</Text>
                          <Text style={styles.grupoText}>Modalidade: Competitivo</Text>
                          <Text style={styles.grupoText}>Rank: Xerife</Text>
                          <Text style={styles.grupoText}>Avaliação: ⭐⭐⭐</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </ScrollView>
                </View>
              </ScrollView>
            </SafeAreaView>
          );









          <View style={styles.container3}>
          <Text style={styles.meusGruposText}>GRUPOS QUE PARTICIPO</Text>

          <ScrollView horizontal={true}>
            <View style={styles.containerJogos}>
              <TouchableOpacity
                style={styles.buttonMaisStyle}
                activeOpacity={0.5}>
                <View style={styles.boxGrupos}>
                  <Text style={styles.grupoTitleText}>GRUPO LOLZINHO</Text>
                  <Text style={styles.grupoText}>Jogo: League of Legends</Text>
                  <Text style={styles.grupoText}>Participantes: 2/5</Text>
                  <Text style={styles.grupoText}>Modalidade: Competitivo</Text>
                  <Text style={styles.grupoText}>Rank: Bronze</Text>
                  <Text style={styles.grupoText}>Avaliação: ⭐⭐⭐⭐⭐</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonMaisStyle}
                activeOpacity={0.5}>
                <View style={styles.boxGrupos}>
                  <Text style={styles.grupoTitleText}>SOLO 2</Text>
                  <Text style={styles.grupoText}>Jogo: League of Legends</Text>
                  <Text style={styles.grupoText}>Participantes: 1/2</Text>
                  <Text style={styles.grupoText}>Modalidade: Competitivo</Text>
                  <Text style={styles.grupoText}>Rank: Diamante</Text>
                  <Text style={styles.grupoText}>Avaliação: ⭐⭐⭐⭐</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonMaisStyle}
                activeOpacity={0.5}>
                <View style={styles.boxGrupos}>
                  <Text style={styles.grupoTitleText}>CSTRIKE</Text>
                  <Text style={styles.grupoText}>Jogo: CS-GO</Text>
                  <Text style={styles.grupoText}>Participantes: 4/5</Text>
                  <Text style={styles.grupoText}>Modalidade: Competitivo</Text>
                  <Text style={styles.grupoText}>Rank: Xerife</Text>
                  <Text style={styles.grupoText}>Avaliação: ⭐⭐⭐</Text>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>